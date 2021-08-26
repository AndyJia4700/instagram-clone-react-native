import { combineReducers } from "redux";
import postReducer from "./post-reducer";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer
})

export default rootReducer;