import React from "react";
import Todo from "./Todo";
export default function TodoList({
    todoList,
    onCheckBtnClick,
    onTrashBtnClick,
}) {
    return (
        <>
            {todoList.map((todo) => {
                return (
                    <Todo
                        todo={todo}
                        key={todo.id}
                        onCheckBtnClick={onCheckBtnClick}
                        onTrashBtnClick={onTrashBtnClick}
                    ></Todo>
                );
            })}
        </>
    );
}
