import { useState } from 'react';

function TareaItem({ tarea, onDelete, onUpdate }) {
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);

  const fecha = new Date(tarea.createdAt).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const guardar = () => {
    onUpdate(tarea._id, { titulo, descripcion });
    setEditando(false);
  };

  const cancelar = () => {
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion);
    setEditando(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
      <div className="flex-1">
        {editando ? (
          <>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full p-1 border rounded mb-1"
            />
            <input
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full p-1 border rounded mb-1"
            />
          </>
        ) : (
          <>
            <h3 className="font-bold text-gray-800">{tarea.titulo}</h3>
            <p className="text-gray-600 text-sm">{tarea.descripcion}</p>
          </>
        )}
        <div className="flex gap-3 items-center mt-1">
          <span className={`text-xs ${tarea.completada ? 'text-green-500' : 'text-yellow-500'}`}>
            {tarea.completada ? 'Completada' : 'Pendiente'}
          </span>
          <span className="text-xs text-gray-400">Creada: {fecha}</span>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        {editando ? (
          <>
            <button
              onClick={guardar}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Guardar
            </button>
            <button
              onClick={cancelar}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditando(true)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={() => onUpdate(tarea._id, { completada: !tarea.completada })}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              {tarea.completada ? 'Desmarcar' : 'Completar'}
            </button>
            <button
              onClick={() => onDelete(tarea._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TareaItem;