import * as firebase from 'firebase';
import db from '../config/Firebase';
import uuid from 'react-native-uuid';


export const updateDescription = (input) => {
    return{
        type: 'UPDATE_DESCRIPTION',
        payload: input
    }
}

export const updateNextPhoto = (input) => {
    return async (dispatch, getState) => {
        try{
            let array = []
            const { post } = getState()
            post.photos?.forEach(photo => {
                array.push(photo)
            })
            array.push(input)
            dispatch({
                type: 'UPDATE_POST_NEXT_PHOTO',
                payload: array
            })
        }catch(e){
            alert(e)
        }
    }
}

export const removeImage = (photoToRemove) => {
    return async (dispatch, getState) => {
        try{
            let array = []
            const {post} = getState()
            post.photos?.forEach(photo => {
                array.push(photo)
            })
            array.splice(photoToRemove, 1)
            dispatch({
                type: 'UPDATE_POST_NEXT_PHOTO',
                payload: array
            })
        }catch(e){
            alert(e)
        }
    }
}


export const uploadPost = () => {
    return async ( dispatch, getState) => {
        try{
            const { post, user, } = getState()
            const id = uuid.v4()
            const upload = {
                id: id,
                uid: user.uid,
                photo: user.photo,
                photos: post.photos,
                username: user.username,
                date: new Date().getTime(),
                likes: [],
                comments: [],
                description: post.description
            }

            await db.collection('posts').doc(id).set(upload)
            await db.collection('users').doc(user.uid).update({
                posts: firebase.firestore.FieldValue.arrayUnion(id)
            })
        }catch(e){
            alert("uploadpost from 'post.jsx'" + e)
        }
    }
}


export const getPosts = (numberOfPosts) => {
    return async (dispatch, getState) => {
        const posts = await db.collection('posts').orderBy('date', 'desc').limit(numberOfPosts).get()
        let listedPosts = []
        posts.forEach(post => {
            listedPosts.push(post.data())
        })
        dispatch({
            type: 'GET_POSTS',
            payload: listedPosts
        })
    }
}

export const likePost = post => {
    return async (disapatch, getState) => {
        try{
            const { uid } = getState().user
            await db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayUnion(uid)
            })
        }catch(e){
            alert("likepost action:" + post + e)
        }
    }
}

export const unlikePost = post => {
    return async (disapatch, getState) => {
        try{
            const { uid } = getState().user
            await db.collection('posts').doc(post.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(uid)
            })
        }catch(e){
            alert("unlikepost action:"+ post+ e)
        }
    }
}