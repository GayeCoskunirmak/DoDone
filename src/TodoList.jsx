import React, { useState } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { Button } from 'react-bootstrap';


function TodoList() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [todoId, setTodoId] = useState(null);
    const [task, setTask] = useState("");


    function addTodo() {

        if (newTodo.trim()) {
            const today = new Date()
            const day = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            const createDate = `${day}/${month}/${year}`

            setTodos([...todos, {
                id: Date.now(),
                text: newTodo,
                completed: false,
                createdAt: createDate
            }]);
            setNewTodo("");
        }
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    function EditText(id, newText) {
        setTodoId(id)
        setTask(newText)
    }
    function saveEditTask(id) {
        setTodos(
            todos.map((todo) => todo.id === id ? { ...todo, text: task } : todo)
        )
        setTodoId(null)
        setTask("")
    }
    function removeTask() {
        setTodoId(null)
        setTask("")
    }


    return (
        < div className="div-container">


            <div>
                <h1>TODO LİST</h1>
            </div>

            <div style={{ marginTop: 20 }}>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Enter a task"
                    className='div-container-input'
                />



                <Button onClick={addTodo} className='add-button'>Add</Button>

            </div>


            <ul className='container-ul'>
                {todos.map((todo) => (
                    <li key={todo.id}  >
                        {todoId == todo.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                    className="edit-input"
                                />
                                <Button onClick={() => saveEditTask(todo.id)} className="save-button">Save</Button>
                                <Button onClick={removeTask} className="cancel-button">Cancel</Button>
                            </div>
                        )
                            :

                            <div onClick={() => toggleComplete(todo.id)}>

                                {todo.text}

                                <div className='date-container'>

                                    {todo.createdAt}
                                </div>

                            </div>
                        }
                        <div className='div-buttons'>
                            <div >
                                <Button onClick={() => EditText(todo.id, todo.text)} className="edit-button">Edit</Button>
                            </div>


                            <CiCircleRemove onClick={(e) => {
                                e.stopPropagation();
                                removeTodo(todo.id);
                            }} className='CiCircleRemove' />

                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList
