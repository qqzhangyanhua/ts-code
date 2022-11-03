import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([
    { id: 1, title: "创建项目", completed: true },
    { id: 2, title: "组件化开发", completed: false },
    { id: 3, title: "掌握JSX", completed: false },
    { id: 4, title: "掌握hooks", completed: false },
  ]);
  const changeState = (e: any, todo: any) => {
    todo.completed = e.target.checked;
    setTodos([...todos]);
  };
  const [newTodo, setNewTodo] = useState("");
  const changeNewTodo = (e: any) => {
    setNewTodo(e.target.value);
  };
  const addTodos = (e: any) => {
    console.log("add", e);
    if (e.keyCode === 13) {
      setTodos([
        ...todos,
        { id: todos.length + 1, title: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };
  const removeTodo = (todo: any) => {
    setTodos(todos.filter((item: any) => item.id !== todo.id));
  };
  const editTodo = (todo:any)=>{
    setEditedTodo({ ...todo });
  }
  const initial = {
    title: "",
    completed: false,
  };
  const [editedTodo, setEditedTodo] = useState(initial);
  const onEditing = (e:any)=>{
    const title = e.target.value;
    if (title) {
      setEditedTodo({ ...editedTodo, title: e.target.value });
    } else {
      // title为空删除该项
      removeTodo(editedTodo);
    }

  }
  const cancelEdit=()=>{
    setEditedTodo(initial);

  }
  const onEdited = (e:any) => {
    if (e.code === "Enter") {
      if (editedTodo.title) {
        // 获取对应待办并更新
        const todo = todos.find((todo:any) => todo.id === editedTodo.id);
        todo.title = editedTodo.title;
        setTodos([...todos]);
      }
      setEditedTodo(initial);
    }
  };
  return (
    <div className="App">
      <header>
        <h1>我的待办事项</h1>
      </header>
      <main>
        <div>
          <input
            placeholder="新增个啥？"
            value={newTodo}
            onChange={changeNewTodo}
            onKeyUp={addTodos}
          />
        </div>
        <section>
          <h2>待办项</h2>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={[
                "todo",
                todo.completed ? "completed" : "",
                editedTodo.title && editedTodo.id === todo.id
                ? "editing"
                : "",
              ].join(" ")}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => changeState(e, todo)}
                />
                <span  onDoubleClick={() => editTodo(todo)}>{todo.title}</span>
                <button onClick={() => removeTodo(todo)}>删除</button>
                <input
                  className="edit"
                  type="text"
                  value={editedTodo.title}
                  onChange={onEditing}
                  onKeyUp={onEdited}
                  onBlur={cancelEdit}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
