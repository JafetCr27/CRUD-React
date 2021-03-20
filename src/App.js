import React, { useState } from 'react'
import { isEmpty,size } from 'lodash' 
import shortid  from 'shortid' 


function App() {
  const[task, seTask] = useState("")
  const [tasks,setTasks] = useState([])
  const [editMode, seteditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)  

  const validForm = ()=>{
    let isValid = true
    setError(null)

    if (isEmpty(task)) {
      setError("Ingrese al menos 1 tarea")
      isValid = false
    }
    return isValid
  }
  const addTask = (e) => {
    e.preventDefault()
    if(!validForm()){
      return
    }
    const newTask = {
      id:shortid.generate(),
      name:task
    }
    setTasks([...tasks, newTask])
    seTask("")
  }
  const deleteTask = (id) =>{
    const filterTask = tasks.filter(task=>task.id !== id)
    setTasks(filterTask)
  }
  const ediTask = (theTask)=>{
    seTask(theTask.name)
    seteditMode(true)
    setId(theTask.id)

  }
  const saveTask = (e)=>{
    e.preventDefault()
    if(!validForm()){
      return
    }
    const editedTasks = tasks.map(item=>item.id == id ? {id,name:task}:item)
    setTasks(editedTasks)
    seteditMode(false)
    seTask("")
    setId("")
  }
  return (
    <div className="container mt-5" >
      <h1>Tareas</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 >Lista de tareas</h4>
          {
            size(tasks) == 0  ?
            (
              <li className="list-group-item">Sin tareas tareas programadas</li>
            ) : 
            (
              <ul className="list-group">
                {
                  tasks.map((task)=>(
                    <li className="list-group-item" key={task.id}>
                      <span className="lead">{task.name}</span>
                      <button 
                        className="btn btn-danger bt-sm float-right mx-2"
                        onClick={()=>deleteTask(task.id)}
                      >
                        Eliminar
                      </button>
                      <button 
                        className="btn btn-warning bt-sm float-right"
                        onClick={()=>ediTask(task)}
                      >
                        Editar
                      </button>
                  </li>
                  ))
                }
              </ul>
            )
          }
        </div>
        <div className="col-4">
          <h4>
            {editMode ? "Modificar":"Editar"} tarea
          </h4>
          <form onSubmit={editMode ? saveTask:addTask}>
              {
                error && <span className="text-danger">{error}</span>
              }
              <input
                type="text" 
                className="form-control mb-2"
                placeholder="Ingrese la tarea..."
                onChange={(text)=>seTask(text.target.value)}
                value={task}
              />
              <button 
                  className={editMode ? "btn btn-warning btn-block float-right": "btn btn-dark btn-block float-right"}
                  type="submit"
              >
                { editMode ? "Guardar":"Agregar"}
              </button>
             
          </form>
        </div>
      </div>
    </div>
  );
}
export default App;
