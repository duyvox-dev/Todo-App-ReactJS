import React from "react";
import { FaTrash } from "react-icons/fa";
export default function Todo({ todo, onCheckBtnClick, onTrashBtnClick }) {
    const checkBoxClass =
        "checked:bg-sky-500 absolute right-10 top-2/4 -translate-y-1/2 cursor-pointer group-hover:block";
    return (
        <button className="group relative bg-slate-200 hover:bg-slate-300 block rounded-md py-2 my-3 text-black w-full text-left px-5 cursor-default">
            {todo.name}
            <input
                type="checkbox"
                className={
                    (todo.isCompleted ? "block " : "hidden ") + checkBoxClass
                }
                onClick={() => onCheckBtnClick(todo.id)}
                disabled={todo.isCompleted}
                checked={todo.isCompleted}
            />
            <FaTrash
                className="hidden absolute text-sky-500 right-3 top-2/4 -translate-y-1/2 cursor-pointer group-hover:block"
                onClick={() => onTrashBtnClick(todo.id)}
            />
        </button>
    );
}
