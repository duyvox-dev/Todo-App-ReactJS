import React from "react";
import {
    TODO_SET_TASK,
    TODO_ADD_TASK,
    TODO_DELETE_TASK,
    TODO_COMPLETE_TASK,
} from "../constants/todoConstants";

export const setTask = (payload) => {
    return {
        type: TODO_SET_TASK,
        payload: payload,
    };
};
export const deleteTask = (payload) => {
    return {
        type: TODO_DELETE_TASK,
        payload: payload,
    };
};
export const addTask = (payload) => {
    return {
        type: TODO_ADD_TASK,
        payload: payload,
    };
};
export const completeTask = (payload) => {
    return {
        type: TODO_COMPLETE_TASK,
        payload: payload,
    };
};
