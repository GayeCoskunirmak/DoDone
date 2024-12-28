import React, { useState } from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';


function TodoList() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [todoId, setTodoId] = useState(null);
    const [task, setTask] = useState("");
    const [theme, setTheme] = useState("light");


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
    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    }

    return (
        < div className={`div-container ${theme}`}>



            <Button onClick={toggleTheme} className='light-btn'>  {theme === "light" ? " Dark Mode" : " Light Mode"}</Button>




            <div>
                <h1>TODO LİST</h1>
            </div>

            <div className="container mt-5">
                <Form className='input-add-btn'>
                    <Form.Group >
                        <Form.Control type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Enter a task"
                            className='input-form1'

                        />
                    </Form.Group>

                    <Button onClick={addTodo} className='add-button'>Add</Button>
                </Form>
            </div>





            <ul className='container-ul'>
                {todos.map((todo) => (
                    <li key={todo.id}  >
                        {todoId == todo.id ? (
                            <div className='save-cancel-div'>
                                <div className='form-li'>

                                    <Form >
                                        <Form.Control

                                            type="text"
                                            value={task}
                                            onChange={(e) => setTask(e.target.value)}
                                            className="edit-input"
                                        />
                                    </Form>
                                </div>
                                <div>

                                    <Button onClick={() => saveEditTask(todo.id)} className="save-button">Save</Button>
                                    <Button onClick={removeTask} className="cancel-button">Cancel</Button>
                                </div>
                            </div>
                        )
                            :

                            <div onClick={() => toggleComplete(todo.id)} className='text-container'>

                                {todo.text}

                                <div className='date-container'>

                                    {todo.createdAt}
                                </div>

                            </div>
                        }
                        <div className='div-buttons'>
                            <div className='btn-edit'>
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
