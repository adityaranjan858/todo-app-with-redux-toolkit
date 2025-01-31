import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "../features/todo/todoSlice";
import Modal from "react-bootstrap/Modal";
import style from "./Todo.module.css";

const Todo = () => {
  const [value, setValue] = useState({
    id: "",
    text: "",
  });
  const [singleId, setSingleId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const singleTodoId = (id) => {
    setSingleId(id);
  };

  useEffect(() => {
    const singleTodo = todos.filter((ele) => ele.id === singleId);
    if (singleTodo.length > 0) {
      setValue(singleTodo[0]);
    }
  }, [singleId, todos]);

  const inputHandler = (e) => {
    let value = e.target.value;
    let word = value.split(" ");
    let newWord = word
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    setValue({ ...value, text: newWord });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: singleId, text: value.text }));
    setValue({ id: "", text: "" });
    handleClose();
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <>
      <h4 className="mt-3 heading"> List</h4>
      <ul className="list-group">
        {todos.length > 0 &&
          todos.map((todo) => {
            return (
                
              <li
                key={todo.id}
                className={`list-unstyled ${style.list_item} `}
              >
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <div> <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />

                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                      color: todo.completed ? "gray" : "",
                  }}

                  className={`${style.list_text} mx-2`}
                >
                  {todo.text}
                </span></div>
                    <div> <div className="mx-2">
                  {/* <!-- Button trigger modal --> */}

                  <button
                    type="button"
                    className={style.edit_btn}
                    onClick={() => {
                      singleTodoId(todo.id);
                      handleShow();
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>

                  <button
                    className={style.del_btn}
                    onClick={() => dispatch(removeTodo(todo.id))}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div></div>
                </div>
               

               
              </li>
            );
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
              <input
                type="text"
                className={`form-control ${style.input_field}`}
                id={style.inputID}
                placeholder="Enter a Todo here..."
                value={value.text}
                onChange={inputHandler}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button className="btn btn-success ms-2" type="submit">
              Update
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Todo;
