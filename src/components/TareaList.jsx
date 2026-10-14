import TareaItem from './TareaItem';

function TareaList({ tareas, onDelete, onUpdate }) {
  if (tareas.length === 0) {
    return <p className="text-gray-500 text-center">No hay tareas todavía.</p>;
  }

  return (
    <div>
      {tareas.map((tarea) => (
        <TareaItem
          key={tarea._id}
          tarea={tarea}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TareaList;