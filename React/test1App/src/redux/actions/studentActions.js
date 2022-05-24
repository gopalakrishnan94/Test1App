import { StudentTypes } from '../types/studentTypes';
import { HTTP } from '../../crudService';

export const getAllStudents = () => async (dispatch) => {
    try {
        const res = await HTTP.get("Students");
        dispatch({
            type: StudentTypes.GET_ALL,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const getStudentById = (id) => async (dispatch) => {
    try {
        const res = await HTTP.get("Students/" + id);
        dispatch({
            type: StudentTypes.GET_BY_ID,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const createStudent = (StudentDTO) => async (dispatch) => {
    try {
        const res = await HTTP.post("Students", StudentDTO);
        dispatch({
            type: StudentTypes.CREATE,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const updateStudent = (StudentDTO, id) => async (dispatch) => {
    console.log(id)
    try {
        const res = await HTTP.put("Students/" + id, StudentDTO);
        console.log(res)
        dispatch({
            type: StudentTypes.UPDATE,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}