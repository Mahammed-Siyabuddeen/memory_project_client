import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  CardMedia,
} from "@material-ui/core/";
import useStyles from "./styles";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost,getRecommendedPost,getSearchPost } from "../../actions/posts";
import { REMOVE_CURRENT_POST } from "../../constants/actionTypes";
import CommentSection from "./CommentSection";
function PostDetails() {
  const classes = useStyles();
  const { posts, post, isLoading,recommended_post } = useSelector((state) => state.posts);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPost(id,posts));
    
  return()=>{
   dispatch({type:REMOVE_CURRENT_POST}) 
  }  
    
  },[id]);
  useEffect(()=>{
    if(post)
    console.log(post.tags.join(','));
    dispatch(getRecommendedPost({search:'none',tags:post?.tags.join(',')}));
  },[post])

  

var openPost=(id)=>history.push(`/posts/${id}`)
  if(!post)return  (
    <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
  )
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  const recommendedPosts=recommended_post?.filter(({_id}) => _id!==post._id)
  


  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div  className={classes.section }>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">     <strong>chats - coming soon!</strong></Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post}></CommentSection>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={post.selectedFile ||"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"}alt={post.title}
          />
        </div>
      </div>

      {recommendedPosts.length  ? (
        
        <div className={classes.section}>
            <Typography gutterBottom variant='h6'>You may Like Also</Typography>
            <Divider/>
          

            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(({title,message,name,selectedFile,_id,likes})=>(
                  <div style={{margin:'20px',cursor:'pointer'}} onClick={()=>openPost(_id)} key={_id}>
                    <Typography gutterBottom variant='h6'>{title}</Typography> 
                    <CardMedia className={classes.media} image={selectedFile} />
                    <Typography gutterBottom variant='subtitle2'>{name}</Typography> 
                    <Typography gutterBottom variant='subtitle2'>{message}</Typography> 
                    <Typography gutterBottom variant='subtitle1'>Likes: {likes.length}</Typography> 
                  </div>
                    ))}
           </div>
          </div>
        
     
      ):null}

    </Paper>
  );
}

export default PostDetails;
