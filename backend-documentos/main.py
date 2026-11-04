import os
import base64
import shutil
import subprocess
import uuid
from typing import List, Optional
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pydantic_settings import BaseSettings
import pymupdf  # Actualizado para eliminar el warning de 'fitz'


class Settings(BaseSettings):
    APP_NAME: str = "API Generador de Documentos"
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"
    UPLOAD_DIR: str = "./uploads"
    EXTENSIONES_PERMITIDAS: set = {".pdf", ".doc", ".docx"}

    class Config:
        env_file = ".env"


settings = Settings()

app = FastAPI(title=settings.APP_NAME)

# Configuración CORS permisiva para desarrollo local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(os.path.join(settings.UPLOAD_DIR, "base"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "generados"), exist_ok=True)


class CampoPayload(BaseModel):
    campo: str
    x_pct: float  # posición horizontal como % del ancho de la página (0-100)
    y_pct: float  # posición vertical como % del alto de la página (0-100)
    valor: str


class EstampadoRequest(BaseModel):
    documento_id: str          # id devuelto por /api/documentos/subir
    pagina: int = 0            # índice de página (0 = primera)
    campos: List[CampoPayload]
    firma_base64: Optional[str] = None


class PaginaPreview(BaseModel):
    numero: int
    imagen_base64: str  # data URL lista para <img src="...">
    ancho: float         # ancho de la página en puntos PDF
    alto: float           # alto de la página en puntos PDF


class DocumentoSubidoResponse(BaseModel):
    documento_id: str
    paginas: List[PaginaPreview]


def convertir_a_pdf_si_necesario(ruta_entrada: str, dir_salida: str) -> str:
    """Convierte .doc/.docx a PDF con LibreOffice headless. Si ya es PDF, no hace nada."""
    ext = os.path.splitext(ruta_entrada)[1].lower()
    if ext == ".pdf":
        return ruta_entrada

    if shutil.which("soffice") is None:
        raise HTTPException(
            status_code=500,
            detail=(
                "LibreOffice (soffice) no está instalado en el servidor, así que no se "
                "pueden convertir archivos .doc/.docx a PDF. Instálalo (apt install "
                "libreoffice) o sube el documento ya como PDF."
            ),
        )

    resultado = subprocess.run(
        ["soffice", "--headless", "--convert-to", "pdf", "--outdir", dir_salida, ruta_entrada],
        capture_output=True,
        timeout=60,
    )
    if resultado.returncode != 0:
        raise HTTPException(
            status_code=500,
            detail=f"Error convirtiendo el documento a PDF: {resultado.stderr.decode(errors='ignore')}",
        )

    nombre_base = os.path.splitext(os.path.basename(ruta_entrada))[0]
    ruta_pdf = os.path.join(dir_salida, f"{nombre_base}.pdf")
    if not os.path.exists(ruta_pdf):
        raise HTTPException(status_code=500, detail="La conversión a PDF no generó el archivo esperado.")
    return ruta_pdf


@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": settings.APP_NAME}


@app.post("/api/documentos/subir", response_model=DocumentoSubidoResponse)
async def subir_documento(archivo: UploadFile = File(...)):
    ext = os.path.splitext(archivo.filename or "")[1].lower()
    if ext not in settings.EXTENSIONES_PERMITIDAS:
        raise HTTPException(status_code=400, detail=f"Formato no soportado ({ext}). Usa PDF, DOC o DOCX.")

    documento_id = uuid.uuid4().hex
    dir_base = os.path.join(settings.UPLOAD_DIR, "base", documento_id)
    os.makedirs(dir_base, exist_ok=True)

    ruta_original = os.path.join(dir_base, archivo.filename)
    with open(ruta_original, "wb") as f:
        f.write(await archivo.read())

    ruta_pdf = convertir_a_pdf_si_necesario(ruta_original, dir_base)

    # Copia normalizada que se reutiliza luego al estampar
    ruta_base_pdf = os.path.join(dir_base, "base.pdf")
    if os.path.abspath(ruta_pdf) != os.path.abspath(ruta_base_pdf):
        shutil.copyfile(ruta_pdf, ruta_base_pdf)

    doc = pymupdf.open(ruta_base_pdf)
    paginas: List[PaginaPreview] = []
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=150)
        img_b64 = "data:image/png;base64," + base64.b64encode(pix.tobytes("png")).decode("ascii")
        paginas.append(
            PaginaPreview(numero=i, imagen_base64=img_b64, ancho=page.rect.width, alto=page.rect.height)
        )
    doc.close()

    return DocumentoSubidoResponse(documento_id=documento_id, paginas=paginas)


@app.post("/api/documentos/procesar")
def procesar_documento(payload: EstampadoRequest):
    dir_base = os.path.join(settings.UPLOAD_DIR, "base", payload.documento_id)
    ruta_base_pdf = os.path.join(dir_base, "base.pdf")

    if not os.path.exists(ruta_base_pdf):
        raise HTTPException(status_code=404, detail="Documento base no encontrado. Súbelo de nuevo.")

    ruta_salida = os.path.join(settings.UPLOAD_DIR, "generados", f"{payload.documento_id}.pdf")
    os.makedirs(os.path.dirname(ruta_salida), exist_ok=True)

    doc = pymupdf.open(ruta_base_pdf)

    if payload.pagina < 0 or payload.pagina >= len(doc):
        doc.close()
        raise HTTPException(status_code=400, detail="Número de página fuera de rango.")

    page = doc[payload.pagina]
    ancho_doc = page.rect.width
    alto_doc = page.rect.height

    for c in payload.campos:
        if not c.valor.strip():
            continue
        pos_x = (c.x_pct / 100.0) * ancho_doc
        pos_y = (c.y_pct / 100.0) * alto_doc

        page.insert_text(
            pymupdf.Point(pos_x, pos_y),
            c.valor,
            fontsize=11,
            fontname="helv",
            color=(0, 0, 0.7),
        )

    if payload.firma_base64:
        try:
            raw_b64 = payload.firma_base64
            if "," in raw_b64:
                raw_b64 = raw_b64.split(",")[1]
            firma_bytes = base64.b64decode(raw_b64)

            tag_firma = next((c for c in payload.campos if c.campo.lower() == "firma"), None)
            if tag_firma:
                fx = (tag_firma.x_pct / 100.0) * ancho_doc
                fy = (tag_firma.y_pct / 100.0) * alto_doc
            else:
                fx, fy = 80, alto_doc - 100

            rect_firma = pymupdf.Rect(fx - 65, fy - 25, fx + 65, fy + 25)
            page.insert_image(rect_firma, stream=firma_bytes)
        except Exception as e:
            print(f"Aviso procesando firma: {e}")

    doc.save(ruta_salida)
    doc.close()

    return FileResponse(path=ruta_salida, media_type="application/pdf", filename="documento_final.pdf")