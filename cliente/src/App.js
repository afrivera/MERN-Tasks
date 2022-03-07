import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import RutaPrivada from './components/rutas/RutaPrivada';
import tokenAuth from './config/tokenAuth';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth( token );
}

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Routes>
                <Route exact path='/' element={<Login />} />
                <Route exact path='/nueva-cuenta' element={<NuevaCuenta />} />
                <Route exact path='/proyectos' element={<RutaPrivada><Proyectos /></RutaPrivada>} />
              </Routes>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
