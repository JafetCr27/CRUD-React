import React, { useState } from 'react'
import { isEmpty } from 'lodash' 
import shortid  from 'shortid' 


function App() {
  const[task, seTask] = useState("")
  const [tasks,setTasks] = useState([])  
  const addTask = (e) => {
    e.preventDefault()
    if (isEmpty(task)) {
      console.log("Esta vacio")
      return
    }
    const newTask = {
      id:shortid.generate(),
      name:task
    }
    setTasks([...tasks, newTask])
    seTask("")
  }
  return (
    <div className="container mt-5" >
      <h1 className="text-center">Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4>Lista de tareas</h4>
          <ul className="list-group">
            {
              tasks.map((task)=>(
                <li className="list-group-item" key={task.id}>
                <span className="lead">{task.name}</span>
                <button className="btn btn-danger bt-sm float-right mx-2">Eliminar</button>
                <button className="btn btn-warning bt-sm float-right">Editar</button>
              </li>
              ))
            }
         
          </ul>
        </div>
        <div className="col-4">
          <h4 >Formulario de ingreso</h4>
          <form onSubmit={addTask}>
            <input
                type="text" 
                className="form-control mb-2"
                placeholder="Ingrese la tarea..."
                onChange={(text)=>seTask(text.target.value)}
                value={task}
              />
              <button 
                  className="btn btn-dark btn-block float-right"
                  type="submit"
                  >
                  Guardar
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
