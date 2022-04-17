import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { v4 } from "uuid";
import TodoList from "./components/TodoList";
import styled from "styled-components";

const AddBtn = styled.button`
    &[disabled]:hover {
        cursor: not-allowed;
    }
`;
const TODOLIST_STORAGE = "todolist_storage";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [textInput, setTextInput] = useState("");

    useEffect(() => {
        const storagedList = localStorage.getItem(TODOLIST_STORAGE);
        if (storagedList) {
            setTodoList(JSON.parse(storagedList));
            setFilteredList(JSON.parse(storagedList));
        }
    }, []);
    useEffect(() => {
        setFilteredList([...todoList]);
        localStorage.setItem(TODOLIST_STORAGE, JSON.stringify(todoList));
    }, [todoList]);

    const onAddBtnClick = () => {
        const newTask = { id: v4(), name: textInput, isCompleted: false };
        setTodoList([newTask, ...todoList]);
        setTextInput("");
    };

    const onTextInputChange = (e) => {
        setTextInput(e.target.value);
    };
    const onCheckBtnClick = (id) => {
        setTodoList((prevState) =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: true } : todo,
            ),
        );
    };
    const onTrashBtnClick = (id) => {
        const index = todoList.findIndex((todo) => todo.id === id);
        todoList.splice(index, 1);
        setTodoList([...todoList]);
    };

    const onCompletedFilterBtnClick = () => {
        const filterArr = todoList.filter((todo) => todo.isCompleted);
        setFilteredList([...filterArr]);
    };

    const onUnCompletedFilterBtnClick = () => {
        const filterArr = todoList.filter((todo) => !todo.isCompleted);
        setFilteredList([...filterArr]);
    };
    const onAllFilterBtnClick = () => {
        const filterArr = [...todoList];

        setFilteredList([...filterArr]);
    };
    return (
        <div className="App flex justify-center items-center">
            <div className="w-2/6 mt-6">
                <h3 className="text-3xl text-sky-500 center">
                    Welcome to To Do App
                </h3>
                <label className="relative block mt-6 flex justify-between">
                    <input
                        className="placeholder:italic placeholder:text-slate-400 center bg-white  border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm flex-1"
                        placeholder="Things to do"
                        type="text"
                        name="search"
                        value={textInput}
                        onChange={onTextInputChange}
                    />
                    <AddBtn
                        className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700  focus:outline-none focus:ring focus:ring-sky-300  rounded-md py-2 px-5 ml-2 text-white "
                        onClick={onAddBtnClick}
                        disabled={!textInput}
                    >
                        Add
                    </AddBtn>
                </label>
                <div className="grid grid-cols-3 gap-4 mt-6">
                    <button
                        className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700  focus:outline-none focus:ring focus:ring-sky-300  rounded-md py-2 px-5 ml-2 text-white "
                        onClick={onAllFilterBtnClick}
                    >
                        All
                    </button>
                    <button
                        className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700  focus:outline-none focus:ring focus:ring-sky-300  rounded-md py-2 px-5 ml-2 text-white "
                        onClick={onCompletedFilterBtnClick}
                    >
                        Completed
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700  focus:outline-none focus:ring focus:ring-gray-300  rounded-md py-2 px-5 ml-2 text-white"
                        onClick={onUnCompletedFilterBtnClick}
                    >
                        UnCompleted
                    </button>
                </div>
                <TodoList
                    todoList={filteredList}
                    onCheckBtnClick={onCheckBtnClick}
                    onTrashBtnClick={onTrashBtnClick}
                />
            </div>
        </div>
    );
}

export default App;
