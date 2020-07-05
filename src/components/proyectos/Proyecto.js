import React, { useContext } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  //Obtenemos el state de proyecto
  const proyectoContext = useContext(ProyectoContext);
  const { proyectoActual } = proyectoContext;
  //Obtener la funcion del Context de tarea
  const tareasContext = useContext(TareaContext);
  const { obtenerTareas } = tareasContext;

  //Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); //Fijar un proyecto actual
    obtenerTareas(id); // filtrar las tareas cuando  se de click
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
