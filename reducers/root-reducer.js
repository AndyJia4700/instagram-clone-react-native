import { combineReducers } from "redux";
import postReducer from "./post-reducer";
import profileReducer from "./profile-reducer";
import userReducer from "./user-reducer";

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    profile: profileReducer
})

export default rootReducer;