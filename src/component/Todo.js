import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todo/todoSlice';
import Modal from 'react-bootstrap/Modal';
import style from "./Todo.module.css";

const Todo = () => {
    const [value, setValue] = useState({
        id: "",
        text: ""
    });
    const [singleId, setSingleId] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const todos = useSelector(state => state.todo.todos);
    const dispatch = useDispatch();

    const singleTodoId = (id) => {
        setSingleId(id);
    }

    useEffect(() => {
        const singleTodo = todos.filter(ele => ele.id === singleId);
        if (singleTodo.length > 0) {
            setValue(singleTodo[0]);
        }
    }, [singleId, todos])

    const inputHandler = (e) => {
        setValue({ ...value, text: e.target.value });
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateTodo({ id: singleId, text: value.text }));
        setValue({ id: "", text: "" });
        handleClose();
    }

    return (
        <>
            <h4 className='mt-3 heading'> List</h4>
            <ul className='list-group'>
                {todos.length > 0 && todos.map((todo) => {
                    return (
                        <li className={`list-unstyled d-flex justify-content-between align-items-center ${style.list_item}`} key={todo.id}>
                            {todo.text}

                            <div className='mx-2'>
                                {/* <!-- Button trigger modal --> */}

                                <button type="button" className={style.edit_btn} onClick={() => { singleTodoId(todo.id); handleShow() }}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </button>

                                <button className={style.del_btn} onClick={() => dispatch(removeTodo(todo.id))}><i className="fa-solid fa-trash-can"></i></button>
                            </div>
                        </li>
                    )
                })}
            </ul>

            {/* update form */}

            {/* <!-- Modal --> */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit </Modal.Title>
                </Modal.Header>
                <form onSubmit={submitHandler}>
                    <Modal.Body>
                        <div className="input-group w-50 m-auto">
                            <input type="text" className={`form-control ${style.input_field}`} id={style.inputID} placeholder="Enter a Todo here..." value={value.text} onChange={inputHandler} />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        <button className="btn btn-success ms-2" type='submit'>Update</button>
                    </Modal.Footer>
                </form>
            </Modal>

        </>
    )
}

export default Todo;
