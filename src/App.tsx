import React, { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoSummary from "./components/TodoSummary";
import ApiClient from "./ApiClient";

const App: React.FC = () => {
  
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const todosFromDb = await ApiClient.allTodos();

      setTodos(todosFromDb);
    };

    fetchData();
  }, []);

  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const [remaining, filteredTodos] = useMemo(() => {
    return [
      todos.filter((todo) => !todo.done).length,
      hideCompleted ? todos.filter((todo) => !todo.done) : todos,
    ];
  }, [todos, hideCompleted]);

  const addTodo: AddTodo = async (newTodo) => {
    if (newTodo !== "") {
      const createdTodo = await ApiClient.addTodo(newTodo);
      setTodos([...todos, createdTodo]);
    }
  };

  const toggleStatus: ToggleStatus = (selectedTodo) => {
    ApiClient.toggleStatus(selectedTodo);
    const updatedTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo: RemoveTodo = async (todoToRemove) => {
    await ApiClient.removeTodo(todoToRemove);
    const remainingTodos = todos.filter((todo) =>  todo !== todoToRemove );
    setTodos(remainingTodos);
  };

  const deleteCompleted = () => {
    todos.filter((todo) =>  todo.done).forEach((d) => removeTodo(d));
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
