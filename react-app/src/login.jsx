import { StrictMode, useContext, useEffect, useState } from "react"
import {HeadElements,useTitle} from "./base.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import './base.css';
import './login.css'
import { createRoot } from "react-dom/client";


//principal funcion para el login de nuestro sistema
createRoot(document.getElementById("login")).render(
    <StrictMode>
        {/*[BASE]Archivo base para los headers*/}
        <HeadElements/>
        <div className="app-window login-layout">
        {/*(EST)Archivo estatico del login*/}
        <StaticContent/>
        {/*(FUN)Funcionalidad para el login*/}
        <LoginPanel/>
        </div>
    </StrictMode>
)

/*================================================
Diccionario de palabras especiales en comentarios:
(FUN) => Funcionalidad
(EST) => Estatico
[BASE] => Origen archivo base
==================================================*/
export function StaticContent(){
    useTitle("Creativa-Iniciar sesion")
    return(
        <div className="login-left">    
            <h2>"Deja de rellenar plantillas, construye tu contrato contigo mismo"</h2>
            <svg className="login-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        </div>
    )
}

function LoginPanel(){
    var [emailS,setEmail]=useState("");
    var [passwordS,setPassword]=useState("");
    var dat;
    return(
        <div className="login-right">
            <div className="login-form">
                {/*Etiqueta para la entrada de correo electronico*/}
                <input 
                type="email" 
                placeholder="Correo Electronico" 
                name="email" 
                value={emailS} 
                onChange={(e)=>{
                    setEmail(e.target.value);
                    }} 
                required/>
                {/*Etiqueta para la entrada de contraseña*/}
                <input type="password" 
                placeholder="Contraseña" 
                name={passwordS} 
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                value={passwordS} 
                required/>
                {/*Boton para activar el evento*/}
                <button type="button" className="btn-primary" onClick={() => enviarDatos(emailS,passwordS)}>Enviar</button>
            </div>
        </div>
    ) 
}


function enviarDatos(gmail,password){
    console.log(gmail + " " + " " +password)
}