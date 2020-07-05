import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
//context
import ProyectoState from "./context/proyectos/ProyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alerta/alertaState";
import AuthState from "./context/autenticacion/authState";
//Token
import tokenAuth from "./config/tokenAuth";
//Ruta Privada
import RutaPrivada from "./components/rutas/RutaPrivada";

//Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  //Todo lo que es en el  switch van a ser cada una de las paginas
  //y todo lo colocado en Router va a ser contenido para todas la paginas
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
