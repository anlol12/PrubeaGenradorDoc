import os
from flask import Flask, request, jsonify
from flask_jwt_extended import jwt_manager,create_access_token,jwt_required,get_jwt_identity
import pymysql
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from methodHash import hashPassword,verifyPassword

app = Flask(__name__)
#conexion a la base de datos
def get_db_connection():
    return pymysql.connect(
        host=os.getenv("MYSQL_HOST", "localhost"),
        user=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_PASSWORD", ""),
        database=os.getenv("MYSQL_DB", "auth_db"),
        cursorclass=pymysql.cursors.DictCursor
    )

#bloque para manejo de tokens jwt
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "cambia-esta-clave-en-produccion")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 3600

jwt = JWTManager(app)

@app.route("/login",method=["POST"])
def login():

    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    #bloque de respuesta en caso de que no se coloquen contraseñas o usuarios
    if not username or not password:
        return jsonify({"msg": "Faltan credenciales"}), 400

    #intentamos conectar y consultar registros con la base de datos
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
            user = cursor.fetchone()
    finally:
        conn.close()

    #si el usuario no existe, retornamos codigo 401
    if user is None:
        return jsonify({"msg": "Credenciales inválidas"}), 401

    #bloque para validar la contraseña con argon2id
    if not verifyPassword(user["password_hash"], password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=str(user["id"]))
    return jsonify({"access_token": access_token}), 200
