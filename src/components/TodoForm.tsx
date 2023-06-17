import { ChangeEvent, FormEvent, useState } from "react";

interface TodoFormProps {
  addTodo: AddTodo;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <div className="input__div">
      <div className="input__wrapper">
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTodo}
            className="todo-input"
            placeholder="What's next?!"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="border"></div>
    </div>
  );
};

export default TodoForm;
