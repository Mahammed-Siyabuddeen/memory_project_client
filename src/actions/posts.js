import { FETCH_ALL,FETCH_POST,START_LOADING,END_LOADING ,CREATE,SEARCH_POST, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getSearchPost=(searchQuery)=>async (dispatch)=>{
  try {
    dispatch({type:START_LOADING})
    const {data:{data}}= await api.getSearchPost(searchQuery)
    dispatch({type: SEARCH_POST, payload:data })
    dispatch({type:END_LOADING})
   } catch (error) {
   }
}

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({type:START_LOADING})
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({type:END_LOADING})
  } catch (error) {
  }
};



export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
  }
};
export const getPost = (id,posts) => async (dispatch) => {
  try {
    console.log(posts);
    dispatch({type:START_LOADING})
    const response  = await posts.find((post)=>post._id===id) ||await api.fetchPost(id);
    console.log(response);
    dispatch({ type: FETCH_POST, payload: response?.data||response });
    dispatch({type:END_LOADING})
  } catch (error) {
  }
};

export const commentPost=(value,id)=>async(dispatch)=>{
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });

    return data.comments;
  } catch (error) {
  }
}