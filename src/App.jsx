import { useState, useEffect } from 'react';
import axios from 'axios';
import TareaList from './components/TareaList';
import TareaForm from './components/TareaForm';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const getTareas = async () => {
    try {
      setCargando(true);
      const { data } = await axios.get(API_URL);
      setTareas(data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    } finally {
      setCargando(false);
    }
  };

  const createTarea = async (nuevaTarea) => {
    try {
      const { data } = await axios.post(API_URL, nuevaTarea);
      setTareas([data, ...tareas]);
    } catch (error) {
      console.error('Error al crear tarea:', error);
    }
  };

  const updateTarea = async (id, cambios) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, cambios);
      setTareas(tareas.map((tarea) => (tarea._id === id ? data : tarea)));
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  const deleteTarea = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTareas(tareas.filter((tarea) => tarea._id !== id));
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  useEffect(() => {
    getTareas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Task App</h1>
        <TareaForm onCreate={createTarea} />
        {cargando ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Cargando tareas...</p>
            <p className="text-gray-400 text-sm mt-2">
              (El servidor puede tardar hasta 1 minuto si está dormido)
            </p>
          </div>
        ) : (
          <TareaList
            tareas={tareas}
            onDelete={deleteTarea}
            onUpdate={updateTarea}
          />
        )}
      </div>
    </div>
  );
}

export default App;