import React, { useState ,useEffect} from "react";

function Button() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(" ");
  /* this state is for ,to change the text of the Add todo button when edit is clicked.
    So we will take this state in editTodo as true ,by this this stae will understand
    that edit has been clicked and state is true. 
    */
  const [isEdit, isSetEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  // Locla Storage
  const localStore = (allTodos) => {
    localStorage.setItem("todosAll", JSON.stringify(allTodos));
  };

  const handleClick = (params, x) => {
    if (isEdit) {
      const temp = [...todos];
      temp[editIndex] = { name: input, markDone: false };
      setTodos(temp);
      setInput("");
      isSetEdit(false);
      setEditIndex(-1);
      // localStorage function
      localStore(temp);
    } else {
      const list = [...todos, { name: input, markDone: false }];
      setTodos(list);
      setInput(""); //CLearing the input after the entry & ready for next entry
      // localStorage function
      localStore(list);
    }
  };

  // Remove todo
  const delteTodo = (index) => {
    /* now to remove the element from setTodos array,but we can't directly remove the element for removing element we have to change the state, so we will take 
      a temporary array & copy all todos
      */
    const dltTodo = [...todos];
    dltTodo.splice(index, 1);
    setTodos(dltTodo);
    // localStorage function
    localStore(dltTodo);
  };
  // Edit the todo
  const editTodo = (index) => {
    const valueEdit = todos[index];
    // By de structuring we can do this
    const { name } = todos[index];
    isSetEdit(true);
    // setInput(valueEdit.name);
    setInput(name);
    // after this we will use ternary operator add todo button for the changing the value of add todo button to edit
    setEditIndex(index);
    // localStorage function
    localStore(valueEdit);
  };
  const markDone = (index) => {
    const allTodos = [...todos];
    const todo = allTodos[index];
    todo.markDone = true;
    setTodos(allTodos);
    // localStorage function
    localStore(allTodos);
  };
    useEffect(()=>{
      if(todos.length > 0) localStorage.setItem("todosAll", JSON.stringify(todos));
    }, [todos]);

    useEffect(()=>{
      setTodos(JSON.parse(localStorage.getItem("todosAll")));
    }, []);
  return (
    <div className="todo">
      <h2>Add Todo</h2>
      <input
        type="text"
        value={input}
        placeholder="Enter Value"
        //Getting the values in input
        onChange={(event) => setInput(event.target.value)}
      />
      <button onClick={handleClick}>{isEdit ? "Edit Todo" : "Add Todo"}</button>
      <br></br>
      {todos.map((item, i) => (
        <span
          style={{ textDecoration: item.markDone ? "line-through" : "none" }}
          className="outPut"
        >
          <p key={i}>{item.name}</p>
          {!item.markDone ? (
            <>
              <button onClick={() => delteTodo(i)}>Delete</button>
              <button onClick={() => editTodo(i)}>Edit Todo</button>
              <button onClick={() => markDone(i)}>Done</button>
            </>
          ) : null}
        </span>
      ))}
    </div>
  );
}

export default Button;
