const userReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case 'LOGIN':
            return action.payload
        case "UPDATE_EMAIL":
            return {...state, email: action.payload}
        case "UPDATE_PASSWORD":
            return {...state, password: action.payload}
        case "UPDATE_USERNAME":
            return {...state, username: action.payload.toLowerCase()}
        // case RECEIVE_CURRENT_USER:
        //     return merge({}, state, {[action.user.id]: action.user});
        // case RECEIVE_USER:
        //     return merge({}, state, {[action.user.id]: action.user});
        // case RECEIVE_ALL_USERS:
        //     return merge({}, state, action.users);
        default:
            return state
    }
}


export default userReducer;