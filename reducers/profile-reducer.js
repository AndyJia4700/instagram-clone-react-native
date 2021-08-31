// const profile = (state={})
const profileReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case 'GET_PROFILE':
            return action.payload
        default:
            return state
    }
}


export default profileReducer;