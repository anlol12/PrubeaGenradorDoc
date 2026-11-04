import Inicio from './pages/Inicio';
import MisDocumentos from './pages/MisDocumentos';

export default function App() {
  const path = window.location.pathname;

  if (path === '/mis-documentos') return <MisDocumentos/>;
  return <Inicio />;
}