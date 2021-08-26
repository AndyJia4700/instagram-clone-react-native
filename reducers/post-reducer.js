const postReducer = (state = {photos: []}, action) => {
    Object.freeze(state);
    switch(action.type){
        case "UPDATE_POST_NEXT_PHOTO":
            return {...state, photos: action.payload}
            
        default:
            return state
    }
}


export default postReducer;