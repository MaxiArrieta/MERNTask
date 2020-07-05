import React, { useContext, useState, useEffect } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  //Extraer si un proyecto esta activo
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;

  //Obtener la funcion del Context de agregarTarea
  const tareasContext = useContext(TareaContext);
  const {
    tareaSeleccionada,
    errorTarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = tareasContext;

  //Effect que detecta si hayuna tarea seleciionada
  useEffect(() => {
    if (tareaSeleccionada !== null) {
      setTarea(tareaSeleccionada);
    } else {
      setTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);
  //State del formulario
  const [tarea, setTarea] = useState({
    nombre: "",
  });

  //Extraer el nombre del Proyecto
  const { nombre } = tarea;

  //Si no hay Proyecto seleccionado
  if (!proyecto) return null;

  //Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  //Leer los valores del formulario
  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    //Si es edicion o es una nueva tarea
    if (tareaSeleccionada === null) {
      //Agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    } else {
      //Actualizar tarea existente
      actualizarTarea(tarea);
      //Elimina tareaSeleccionada del state
      limpiarTarea();
    }

    //Obtener y filtrar las tareas deel proyecto actual
    obtenerTareas(proyectoActual.id);

    //Reiniciar el form
    setTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            name="nombre"
            placeholder="Nombre Tarea.."
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
