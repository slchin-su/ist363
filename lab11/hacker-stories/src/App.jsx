import './App.css';
import { useState } from "react";

let initialTasks = [
  {id: 1, item: 'Complete Lab 11', status: 'Not Completed'},
  {id: 2, item: 'Review JSX Events and State', status: 'Not Completed'},
  
]
let nextId = 3;

function App() {
  const [tasks, setTasks] = useState(initialTasks);
      return ( 
        <div>
          <h1>To-Do List</h1>
          <AddTask tasks={tasks} setTasks={setTasks} />
          <ToDoList tasks={tasks} setTasks={setTasks}/>
        </div>
      );
    }

// This is the resource I used to help with adding tasks: "Updating Arrays in State" article on React.dev
const AddTask = ({tasks, setTasks}) => {
  const [name, setName] = useState('')

  const addTask = () => {
    setTasks([
      ...tasks,
      {id: nextId++, item: name, status: 'Not Completed'}
    ]);
  };

    return (
    <div>
    <input id="task" type="text" value={name} placeholder="Enter a Task" onChange={e => setName(e.target.value)} />
    <button onClick={addTask}>Add Task</button>
    </div>
    );
};


function ToDoList({tasks, setTasks}) {

  //This is the resource that helped me with the crossout: "Changing CSS styling with React onClick() Event" on GeeksforGeeks

  const crossOut = (id) => {
      console.log("you just clicked X");
      setTasks (tasks.map(function(task) {
      if (task.id === id) {
        let newStatus;
        if (task.status === 'Not Completed') {
          newStatus = 'Completed';
        } else {
          newStatus = 'Not Completed';
        }
        return {...task, status: newStatus};
      } else {
        return task;
      }
    }));
  };

    return (
      <div>
        <ul>
          {
            tasks.map(function(task) {
              let style;
              if (task.status === 'Not Completed') {
                style = 'uncross';
              } else {
                style = 'cross';
              }
            return <li key={task.id} className={style}>{task.item} 
            <button onClick={ () => crossOut(task.id)}>&#x274C;</button>
            </li>;
          })}
        </ul>
      </div>
    );
    }

export default App
