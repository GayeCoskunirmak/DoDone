import React, { useState } from 'react';
import { CiCircleRemove } from "react-icons/ci";

function TodoList() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
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



    return (
        < div className='div-container'>

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



                <button onClick={addTodo} className='add-button'>Add</button>

            </div>


            <ul className='container-ul'>
                {todos.map((todo) => (
                    <li key={todo.id} onClick={() => toggleComplete(todo.id)}>
                        <div>


                            {todo.text}

                            <div className='date-container'>

                                {todo.createdAt}
                            </div>

                        </div>
                        <div>
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
