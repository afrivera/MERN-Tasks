import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import AlertaState from './context/alertas/alertaState';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';

function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <Router>
            <Routes>
              <Route exact path='/' element={<Login />} />
              <Route exact path='/nueva-cuenta' element={<NuevaCuenta />} />
              <Route exact path='/proyectos' element={<Proyectos />} />
            </Routes>
          </Router>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
