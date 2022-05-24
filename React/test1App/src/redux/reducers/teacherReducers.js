import { TeacherTypes } from '../types/teacherTypes';

const  initialState = {
    TeachersList: [],
    Teacher: {}
};

export const TeacherReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {

        case TeacherTypes.GET_ALL:
            return {...state, TeachersList: payload};

        case TeacherTypes.GET_BY_ID:
            return {...state, Teacher: payload};

        case TeacherTypes.CREATE:
            return {...state.Teacher, payload};

        case TeacherTypes.UPDATE:
            return {...state, Teacher: payload};

        default:
            return state; 
    }
}