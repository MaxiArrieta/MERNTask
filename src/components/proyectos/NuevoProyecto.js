import React, { Fragment, useState, useContext } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";

const NuevoProyecto = () => {
  //obtener el state del formulario
  const proyectoContext = useContext(ProyectoContext);
  //Consumimos el context  y extraemos los datos que necesitamos
  const {
    formulario,
    errorFormulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
  } = proyectoContext;

  //State del proyecto
  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  //Extraer nombre del proyecto
  const { nombre } = proyecto;

  //Contenidos del input
  const onChangeProyecto = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  //cuando el usuario envia un proyecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    //validamos el proyecto
    if (nombre === "") {
      mostrarError();
      return;
    }

    //Agregar al state
    agregarProyecto(proyecto);
    //reiniciar el form
    setProyecto({
      nombre: "",
    });
  };
  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <Fragment>
      <button
        className="btn btn-block btn-primario"
        type="button"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre Proyecto"
            className="input-text"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            value="Agregar Proyecto"
            className="btn btn-primario btn-block"
          />
        </form>
      ) : null}
      {errorFormulario ? (
        <p className="mensaje error">El Nombre del Proyecto es obligatorio</p>
      ) : null}
    </Fragment>
  );
};

export default NuevoProyecto;
