import React from "react";
import {
    TODO_SET_TASK,
    TODO_ADD_TASK,
    TODO_DELETE_TASK,
    TODO_COMPLETE_TASK,
} from "../constants/todoConstants";

export const initState = {
    task: "",
    tasks: [],
};
const todoReducer = (state, action) => {
    switch (action.type) {
        case TODO_SET_TASK:
            return {
                ...state,
                task: action.payload,
            };
        case TODO_ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case TODO_DELETE_TASK: {
            const newTasks = [...state.tasks];
            const index = newTasks.findIndex(
                (curTask) => curTask.id === action.payload,
            );
            newTasks.splice(index, 1);
            return {
                ...state,
                tasks: [...newTasks],
            };
        }

        case TODO_COMPLETE_TASK: {
            const newTasks = [...state.tasks];
            newTasks.map((curTask) =>
                curTask.id == action.payload
                    ? (curTask.isCompleted = true)
                    : curTask,
            );
            return {
                ...state,
                tasks: [...newTasks],
            };
        }
        default: {
            throw Error("Unknow action");
        }
    }
};
export default todoReducer;
