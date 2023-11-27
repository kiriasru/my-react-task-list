import '../App.css'

const SobreNosotros = () => {
  return (
    <div>
        
      <h2 className='h2-title'>Acerca de la Aplicación</h2>
      <h3 className='h3-title'>Funcionalidad de la Aplicación:</h3>
      <ul className='ul-list-2'>
        <li className='list-item'>Agregar tareas con título y descripción</li>
        <li className='list-item'>Modificar el título y descripción de una tarea</li>
        <li className='list-item'>Tachar tareas que fueron completadas</li>
        <li className='list-item'>Eliminar tareas</li>
      </ul>

      <h3 className='h3-title'>Tecnologías usadas para su desarrollo:</h3>
      <ul>
        <li className='list-item'>React</li>
        <li className='list-item'>React Router</li>
        <li className='list-item'>React Icons</li>
        <li className='list-item'>CSS</li>
      </ul>
      
      
    </div>
  );
};

export default SobreNosotros;
