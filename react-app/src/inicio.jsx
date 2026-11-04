//librerias de bootstrap importadas directamente desde react
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './base.css';

//librerias para funcionalidades y componentes base
import {BrowserRouter,Link} from "react-router-dom"
import {useTitle,HeadElements,NavBar,Footer} from "./base.jsx"

//cambiamos el titulo de la pagina dinamicamente en base a la pagina
useTitle("Creativa-Inicio")

/*================================================
Diccionario de palabras especiales en comentarios:
(FUN) => Funcionalidad
(EST) => Estatico
[BASE] => Origen archivo base
==================================================
Ademas de eso, marcare por numeros los componentes para que sea facil ubicarlos
*/

//renderizamos la pagina
export function Inicio(){
    return(
  //en el render se pretende dejar solo los elementos estaticos de la pagina, seccionando los elementos dinamicos a componentes separados
  //arrancamos la aplicacione en modo estricto para el log de errores en terminal
    <div className="app-window">
            {/*(FUN)[BASE]Elemento que contiene algunas configuraciones para la cabecera */}
            <HeadElements />
            {/*(FUN)[BASE]Elemento que contiene la barra de navegacion */}
            <NavBar />
            {/*(EST)Contenido estatico de la pagina */}
            <main className="main-content">
                <div className="blue-banner active">
                    <h1>Tu contrato, hecho a tu medida, cláusula por cláusula</h1>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                </div>
                {/*1.(FUN)Elemento que contiene las tarjetas de navegacion */}
                <Cards />
    
                </main>
            {/*(FUN)[BASE]Elemento que contiene el pie de pagina */}
            <Footer/>
        </div>
        )
}

//elementos del body por separado
//1. Cards en pagina
export function Cards(){
    return(
        <div className="cards-grid" >
            <ContratosLaborales/>
            <Arrendamiento/>
            <Confidencialidad/>
        </div>
    )
}

//separamos cada tarjeta para que sea mas facil manejarla
//1.1 Tarjeta de contratos laborales
export function ContratosLaborales(){
    return(
        <BrowserRouter>
            <div className="card-option" >
                <svg viewBox="0 0 24 24" fill="currentColor"  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" ></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                <Link to="/ContratoLaboral.html"  className="card-option2"><h3 >Contrato laboral</h3></Link>
            </div>
        </BrowserRouter>
    )
}

//1.2 Tarjeta de arrendamiento
export function Arrendamiento(){
    return(
        <BrowserRouter>
            <div className="card-option">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <Link to="/Arrendamiento.html" className="card-option2"><h3>Arrendamiento</h3></Link>
            </div>
        </BrowserRouter>
    )
}

//1.3 Tarjeta de Confidencialidad
export function Confidencialidad(){
    return(
        <BrowserRouter>
            <div className="card-option">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <Link href="Confidencial.html" className="card-option2"><h3>Confidencialidad</h3></Link>
            </div>
        </BrowserRouter>
    )
}