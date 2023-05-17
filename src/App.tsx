import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoSummary from "./components/TodoSummary";

const App: React.FC = () => {
  
  const [todos, setTodos] = useState<Array<Todo>>([
    { id: uuidv4(), text: "Do something.", done: false },
    { id: uuidv4(), text: "Do something else.", done: false },
    { id: uuidv4(), text: "Done something.", done: true },
  ]);

  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const [remaining, filteredTodos] = useMemo(() => {
    return [
      todos.filter((todo) => !todo.done).length,
      hideCompleted ? todos.filter((todo) => !todo.done) : todos,
    ];
  }, [todos, hideCompleted]);

  const addTodo: AddTodo = (newTodo) => {
    if (newTodo !== "") {
      setTodos([...todos, { id: uuidv4(), text: newTodo, done: false }]);
    }
  };

  const toggleStatus: ToggleStatus = (selectedTodo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo: RemoveTodo = (todoToRemove) => {
    const remainingTodos = todos.filter((todo) =>  todo !== todoToRemove );
    setTodos(remainingTodos);
  };

  const deleteCompleted = () => {
    setTodos(todos.filter((t) => !t.done));
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div style={{ flex: 1 }}>
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={filteredTodos}
            toggleStatus={toggleStatus}
            removeTodo={removeTodo}
          />
          <TodoSummary
            remaining={remaining}
            hideCompleted={hideCompleted}
            clickHideCompleted={() => setHideCompleted(!hideCompleted)}
            deleteCompleted={deleteCompleted}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
