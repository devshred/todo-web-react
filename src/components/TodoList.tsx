import { useState } from "react";
import { TodoListItem } from "./TodoListItem";

interface TodoListProps {
  todos: Array<Todo>;
  toggleStatus: ToggleStatus;
  removeTodo: RemoveTodo;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleStatus,
  removeTodo,
}) => {
  return (
    <div className="todo-list">
        <div>
            {todos.map((todo) => (
                <TodoListItem
                key={todo.id}
                todo={todo}
                toggleStatus={toggleStatus}
                removeTodo={removeTodo}
                />
            ))}
        </div>
    </div>
  );
};

export default TodoList;