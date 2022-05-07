import {
  FETCH_ALL,
  START_LOADING,
  END_LOADING,
  CREATE,
  SEARCH_POST,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_POST,
  COMMENT,
  REMOVE_CURRENT_POST
} from "../constants/actionTypes";

export default (state = { isLoading: false, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPage: action.payload.numberOfPage,
      };
    case FETCH_POST:
      return {...state,post: action.payload}
    case SEARCH_POST:
      return { ...state, posts: action.payload };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case CREATE:
      return {...state,posts:[action.payload,...state.posts]};
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case COMMENT:
      return{ ...state,
        posts:state.posts.map((post)=>{
          console.log(action.payload);
          if(post._id===action.payload._id) return action.payload;
          
          return post;
        })
      }  
    case REMOVE_CURRENT_POST: return{...state,post:null}  
    default:
      return state;
  }
};
