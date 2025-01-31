import { createSlice } from "@reduxjs/toolkit";

let idVal = 1;
/* Function to serialize the id value */
const getNextId = () => {
    const currentId = idVal;
    idVal++;
    return currentId;
}

const initialState = {
    todos: [{
        id : getNextId(),
        text : "Finish React Tutorials",
        completed : false
    },
    {
        id : getNextId(),
        text : "Attend GFG Hackathon",
        completed : false
    },  
    {
        id : getNextId(),
        text : "Complete Machine Coding",
        completed : false
    },  
]
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: getNextId(),
                text: action.payload,
                completed : false
            }
            state.todos.push(todo)
        },
        toggleTodo : (state, action)=>{
            const toggleTodos = state.todos.find(todo=>todo.id === action.payload)
            if(toggleTodos){
               toggleTodos.completed = !toggleTodos.completed
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todoIndex = state.todos.findIndex(todo => todo.id === id);
            if (todoIndex !== -1) {
                state.todos[todoIndex].text = text;
            }
        }

    }
})

export const { addTodo, removeTodo, updateTodo,toggleTodo } = todoSlice.actions
export default todoSlice.reducer