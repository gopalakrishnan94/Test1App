import { combineReducers } from "redux";
import { StudentReducer } from "./studentReducers";
import { TeacherReducer } from "./teacherReducers";

const reducers = combineReducers({
   StudentReducer: StudentReducer,
   TeacherReducer: TeacherReducer  
});

export default reducers;