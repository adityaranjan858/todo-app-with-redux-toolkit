import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import style from "./AddTodo.module.css"

const AddTodos = () => {

    const [value, setValue] = useState("");
    const dispatch = useDispatch()
    const inputHandler = (e) => {
        setValue(e.target.value)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(value))
        setValue("")
    }
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="input-group w-50 m-auto">
                    <input type="text" autoComplete='on' className={`form-control ${style.input_field}`} id={style.inputID} placeholder="Enter a Todo here..." value={value} onChange={inputHandler} />
                    <div className="input-group-append">
                        <button className="btn btn-success ms-2" disabled={value.length === 0} type='submit'>Add a Todo</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddTodos;