import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alerta/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  //Extraer los valores
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  //Extraenos context de autenticacion
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //State Inicio de sesion
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  //En caso de que el password o el usuario no exista
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    // eslint-disable-next-line
  }, [mensaje, autenticado, props.history]);

  //Extraer del usuario
  const { email, password } = user;
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //validar campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los cambios son bligatorios", "alerta-error");
    }
    //pasarlo al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesion"
            />
          </div>
        </form>
        <Link
          to={"nueva-cuenta"}
          className="btn btn-primario btn-block centrar"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Login;
