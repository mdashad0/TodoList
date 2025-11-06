import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

export default function TodoList() {
    let [todos, setTodos] = useState([{task: "sample-tsak", id: uuidv4(), done: false}]);
    let[newTodo, setNewTodo] = useState("");

    let addNewTask = () =>{
        setTodos((prevTodos) => {
            return [...prevTodos, {task: newTodo, id: uuidv4(), done: false}]
        });
        setNewTodo("");
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos)=>todos.filter((prevTodos) => prevTodos.id !== id));
    };
    let upperCaseAll = () => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
            return{
                ...todo,
                task: todo.task.toUpperCase()
            };
        })
        ));
    };

    let upercaseOne = (id) => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) =>{
                if(todo.id===id){
                    return{
                    ...todo,
                    task: todo.task.toUpperCase()
                };
            }else{
                return todo;
            }
            })
        ));
    };

    let toggleDone = (id) => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                if(todo.id === id) {
                    return {
                        ...todo,
                        done: !todo.done
                    };
                }
                return todo;
            })
        ));
    };

    return (
        <div className="todo-container">
            <h1 className="todo-header">Add Your Task</h1>
            
            <div className="todo-input-container">
                <input 
                    className="todo-input"
                    placeholder="Add a new task..." 
                    value={newTodo} 
                    onChange={updateTodoValue}
                />
                <button className="btn btn-add" onClick={addNewTask}>
                    Add Task
                </button>
            </div>

            <hr className="divider" />

            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        <span className={`todo-text ${todo.done ? 'completed' : ''}`}>
                            {todo.task}
                        </span>
                        <div className="todo-buttons">
                            <button 
                                className="btn btn-done" 
                                onClick={() => toggleDone(todo.id)}
                            >
                                {todo.done ? 'Undo' : 'Done'}
                            </button>
                            <button 
                                className="btn btn-uppercase" 
                                onClick={() => upercaseOne(todo.id)}
                            >
                                UPERCASE_ONE
                            </button>
                            <button 
                                className="btn btn-delete" 
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {todos.length > 0 && (
                <button 
                    className="btn btn-uppercase-all" 
                    onClick={upperCaseAll}
                >
                    Uppercase All Tasks
                </button>
            )}
        </div>
    );
};
