import { StudentTypes } from '../types/studentTypes';

const  initialState = {
    StudentList: [],
    Student: {}
};

export const StudentReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {

        case StudentTypes.GET_ALL:
            return {...state, StudentList: payload};

        case StudentTypes.GET_BY_ID:
            return {...state, Student: payload};

        case StudentTypes.CREATE:
            return {...state.Student, payload};

        case StudentTypes.UPDATE:
            return {...state, Student: payload};

        default:
            return state; 
    }
}