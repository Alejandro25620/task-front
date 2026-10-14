import { useState } from 'react';

function TareaForm({ onCreate }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    onCreate({ titulo, descripcion });
    setTitulo('');
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
      <input
        type="text"
        placeholder="Título de la tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Crear tarea
      </button>
    </form>
  );
}

export default TareaForm;