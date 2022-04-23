import React, { useState, useEffect, useReducer, useRef } from "react";
import { v4 } from "uuid";
import TodoList from "./components/TodoList";
import todoReducer, { initState } from "./reducer/todoReducer";
import {
    addTask,
    deleteTask,
    setTask,
    completeTask,
} from "./actions/todoActions";

const TODOLIST_STORAGE = "todolist_storage";

function App() {
    const [todoList, dispatch] = useReducer(todoReducer, initState);
    const [filteredList, setFilteredList] = useState([]);
    const inputEl = useRef(null);

    // get localStorage when app just open
    useEffect(() => {
        const storagedList = localStorage.getItem(TODOLIST_STORAGE);
        if (storagedList) {
            todoList.tasks = [...JSON.parse(storagedList)];
            setFilteredList(JSON.parse(storagedList));
        }
    }, []);
    useEffect(() => {
        setFilteredList([...todoList.tasks]);
        localStorage.setItem(TODOLIST_STORAGE, JSON.stringify(todoList.tasks));
    }, [todoList.tasks]);

    const onAddBtnClick = () => {
        const newTask = { id: v4(), name: todoList.task, isCompleted: false };
        dispatch(addTask(newTask));
        dispatch(setTask(""));
        inputEl.current.focus();
    };

    const onTextInputChange = (e) => {
        dispatch(setTask(e.target.value));
    };
    const onCheckBtnClick = (id) => {
        dispatch(completeTask(id));
    };
    const onTrashBtnClick = (id) => {
        dispatch(deleteTask(id));
    };

    const onCompletedFilterBtnClick = () => {
        const filterArr = todoList.tasks.filter((todo) => todo.isCompleted);
        setFilteredList([...filterArr]);
    };

    const onUnCompletedFilterBtnClick = () => {
        const filterArr = todoList.tasks.filter((todo) => !todo.isCompleted);
        setFilteredList([...filterArr]);
    };
    const onAllFilterBtnClick = () => {
        const filterArr = [...todoList.tasks];

        setFilteredList([...filterArr]);
    };
    return (
        <div className="App flex justify-center items-center">
            <div className="w-full sm:w-1/2 md:w-xl mt-6 px-3">
                <h3 className="text-3xl text-sky-500 center">
                    Welcome to To Do App
                </h3>
                <label className="relative block mt-6 flex justify-between">
                    <input
                        className="placeholder:italic placeholder:text-slate-400 center bg-white  border border-slate-300 rounded-md py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm flex-1"
                        placeholder="Things to do"
                        type="text"
                        name="search"
                        value={todoList.task}
                        onChange={onTextInputChange}
                        ref={inputEl}
                    />
                    <button
                        className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700  focus:outline-none focus:ring focus:ring-sky-300  rounded-md py-2 px-5 ml-2 text-white disabled:bg-slate-500 disabled:cursor-not-allowed"
                        onClick={onAddBtnClick}
                        disabled={!todoList.task}
                    >
                        Add
                    </button>
                </label>
                <div className="grid sm:grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                    <button
                        className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700  focus:outline-none focus:ring focus:ring-sky-300  rounded-md py-2 text-white "
                        onClick={onAllFilterBtnClick}
                    >
                        All
                    </button>
                    <button
                        className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700  focus:outline-none focus:ring focus:ring-sky-300  rounded-md py-2 text-white"
                        onClick={onCompletedFilterBtnClick}
                    >
                        Completed
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 active:bg-gray-700  focus:outline-none focus:ring focus:ring-gray-300  rounded-md py-2 text-white"
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
