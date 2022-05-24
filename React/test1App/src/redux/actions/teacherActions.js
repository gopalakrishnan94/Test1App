import { TeacherTypes } from '../types/teacherTypes';
import { HTTP } from '../../crudService';

export const getAllTeachers = () => async (dispatch) => {
    try {
        const res = await HTTP.get("Teachers");
        dispatch({
            type: TeacherTypes.GET_ALL,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getTeacherById = (id) => async (dispatch) => {
    try {
        const res = await HTTP.get("Teachers/" + id);
        dispatch({
            type: TeacherTypes.GET_BY_ID,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const createTeacher = (TeacherDTO) => async (dispatch) => {
    try {
        const res = await HTTP.post("Teachers", TeacherDTO);
        dispatch({
            type: TeacherTypes.CREATE,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateTeacher = (TeacherDTO, id) => async (dispatch) => {
    try {
        const res = await HTTP.put("Teachers/" + id, TeacherDTO);
        console.log(res)
        dispatch({
            type: TeacherTypes.UPDATE,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}