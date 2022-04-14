import React from "react";
import styled from "styled-components";

const TaskItem = styled.button`
    &:hover {
        .checkbox {
            display: inline-block;
        }
    }
    &:hover {
        transition: background-color 0.3s ease;
    }
`;
export default function Todo({ todo, onCheckBtnClick }) {
    const checkBoxClass =
        "checkbox checked:bg-sky-500 absolute right-6 top-2/4 -translate-y-1/2 cursor-pointer";
    return (
        <TaskItem className="relative bg-slate-200 hover:bg-slate-300 block rounded-md py-2 my-3 text-black w-full text-left px-5 cursor-default">
            {todo.name}
            <input
                type="checkbox"
                className={
                    (todo.isCompleted ? "block" : "hidden") + checkBoxClass
                }
                onClick={() => onCheckBtnClick(todo.id)}
                disabled={todo.isCompleted}
                checked={todo.isCompleted}
            />
        </TaskItem>
    );
}
