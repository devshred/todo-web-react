import React from "react";
import classNames from "classnames";

interface TodoListItemProps {
  todo: Todo;
  toggleStatus: ToggleStatus;
  removeTodo: RemoveTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  toggleStatus,
  removeTodo,
}) => {
    const textClass = classNames({
        'text': !todo.done,
        'text text-done': todo.done
      });

  return (
    <div className="list">
        <label className="material-checkbox">
            <input type="checkbox" checked={todo.done} onChange={() => toggleStatus(todo)} />
            <span></span>
        </label>
        <div className={textClass}>{todo.text}</div>
        <button type="submit" className="todo-button" onClick={() => removeTodo(todo)}>X</button>
    </div>
  );
};
