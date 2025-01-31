import './App.css';
import AddTodos from './component/AddTodos';
import Todo from './component/Todo';

function App() {
  return (
    <div className="App">
     <h3 className='mb-5 mt-2 heading'>My Tasks</h3>
     <AddTodos/>
     <Todo/>
    </div>
  );
}

export default App;
