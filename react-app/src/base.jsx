/*
=====================================================================================================================
Aqui se colocan los elementos que se repiten dentro de nuestra aplicacion para evitar estarlos escribiendo o buscando
=====================================================================================================================
*/

//importamos lo necesario, en este caso es el logo junto con las librerias para el correcto enrutamiento
import logo from './assets/logo.jpg';
import {BrowserRouter,Link} from "react-router-dom";

//1.funcion para cambiar dinamicamente el titulo de nuestra aplicacion
export function useTitle(titulo){
  document.title = titulo
}

//2.elementos del header
export function HeadElements() {
  return (
    <div>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </div>
  )
}

//3.El nav bar, luego esta navBar la inyectaremos dentro del elemento index body asi como dentro de otros elementos que contengan una navBar
export function NavBar(){
    return(
        <BrowserRouter>
            <header className="top-header">
                <Link to="/" className="logo-btn">
                    <img src={logo} alt="Creativa Logo" className="logo-img"/>
                </Link>
                <nav>
                    <Link to="/" className="active">Inicio</Link>
                    <Link to="/my_docs.html">Mi documentos</Link>
                    <Link to="#">Ayuda</Link>
                </nav>
            </header>
        </BrowserRouter>
    );
}

//4.Componente footer
export function Footer(){
    return(
        <BrowserRouter>
            <footer className="page-footer">
                <Link to="#" className="footer-btn">Términos</Link>
                <Link to="#" className="footer-btn">Privacidad</Link>
                <Link to="Resumen.html" className="footer-btn disabled">Acceso interno</Link>
            </footer>
        </BrowserRouter>
    )
}

