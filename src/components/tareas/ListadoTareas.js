import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/tareaContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  //Obtenemos el state de proyecto
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectoContext;

  //Obtener las tareas del proyecto
  const tareasContext = useContext(TareaContext);
  const { tareasProyecto } = tareasContext;

  //Si no hay Proyecto seleccionado
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Eliminar un proyecto
  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };
  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre}</h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea.id} timeout={200} classNames="tarea">
                <Tarea tarea={tarea} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
