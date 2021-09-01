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
                description: post.description,
                savedBy: [],
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

export const getPost = (post) => {
    return async (dispatch, getState) => {
        try{
            dispatch({
                type: 'GET_POST',
                payload: post
            })
        }catch(e){
            alert(e)
        }
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


export const savePost = post => {
    return async (disapatch, getState) => {
        try{
            const { uid } = getState().user
            await db.collection('posts').doc(post.id).update({
                savedBy: firebase.firestore.FieldValue.arrayUnion(uid)
            })

            await db.collection('users').doc(uid).update({
                savedPosts: firebase.firestore.FieldValue.arrayUnion(post.id)
            })
        }catch(e){
            alert("savepost action:" + post + e)
        }
    }
}

export const unsavePost = post => {
    return async (disapatch, getState) => {
        try{
            const { uid } = getState().user
            await db.collection('posts').doc(post.id).update({
                savedBy: firebase.firestore.FieldValue.arrayRemove(uid)
            })
            
            await db.collection('users').doc(uid).update({
                savedPosts: firebase.firestore.FieldValue.arrayRemove(post.id)
            })
        }catch(e){
            alert("unsavepost action:"+ post+ e)
        }
    }
}

export const getSavedPosts = () => {
    return async (dispatch, getState) => {
        // try{
        //     const { savedPosts } = getState().user
        //     let posts = savedPosts
            
        //     posts.map((savedPostId) =>
        //         db.collection('posts').where('id', '==', savedPostId).get()
        //     )

        //     let listedPosts = []
        //     posts.forEach(post => {
        //         listedPosts.push(post.data())
        //     })

        //     dispatch({
        //         type: 'GET_SAVED_POSTS',
        //         payload: listedPosts
        //     })
        // }catch(e){
        //     alert(e)
        // }
        try{
            const { uid } = getState().user
            const posts = await db.collection('posts').orderBy('date', 'desc').where('savedBy', 'array-contains', uid).get()
            let listedPosts = []
            posts.forEach(post => {
                listedPosts.push(post.data())
            })
            dispatch({
                type: 'GET_SAVED_POSTS',
                payload: listedPosts
            })
        }catch(e){
            alert(e)
        }
    }
}

export const addMessage = (text) => {
    return (dispatch, getState) => {
        const { uid, photo, username } = getState().user
        try {
            const message = {
                message: text,
                photo: photo,
                username: username,
                uid: uid,
                date: new Date().getTime()
            }
             db.collection('messages').doc().set(message)
        } catch (e) {
            alert("post-action-addMessage" + e)
        }
    }
}


