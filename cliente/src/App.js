import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/nueva-cuenta' element={<NuevaCuenta />} />
        <Route exact path='/proyectos' element={<Proyectos />} />
      </Routes>
    </Router>
  );
}

export default App;
