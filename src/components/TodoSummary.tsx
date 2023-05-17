import { FormEvent, useState } from "react";

interface TodoSummaryProps {
  remaining: number;
  hideCompleted: boolean;
  clickHideCompleted: any;
  deleteCompleted: any;
}

export const TodoSummary: React.FC<TodoSummaryProps> = ({ remaining, hideCompleted, clickHideCompleted, deleteCompleted }) => {
  return (
    <footer>
      <span className="text">{remaining} remaining items left.</span>
      <button
        className="summaryButton"
        onClick={deleteCompleted}
        style={{ float: "right" }}
      >
        Delete completed
      </button>
      <button
        type="submit"
        className="summaryButton"
        onClick={clickHideCompleted}
      >
        { hideCompleted? 'Show all' : 'Hide completed' }
      </button>
    </footer>
  );
};

export default TodoSummary;
