import { Button, TextField, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { commentPost } from '../../actions/posts';
import useStyle from './styles'
function CommentSection({post}){
    const classes=useStyle();
    const[comments,setComments]=useState(post?.comments)
    const[comment,setComment]=useState('')
    const user=JSON.parse(localStorage.getItem('profile'))
    const dispatch=useDispatch()
    const commentRef=useRef()
    // const commentsList=useSelector(({state})=>state.posts.fiter(pos)=>pot._id===post._id)


    const handleClick=async()=>{
       var finalComment=`${user.result?.name} :${comment}`;
       var newComments=await dispatch(commentPost(finalComment,post._id))
  
    console.log(finalComment,post.id);
     setComments(newComments)
     setComment('')
     commentRef.current.scrollIntoView({behavior:'smooth'})
    }
    return(
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6' >Comments</Typography>
                     
                    {comments.map((comment,i)=>(
                        <Typography variant='subtitle1'>
                            <strong>{comment.split(':')[0] }</strong>
                            {comment.split(':')[1]}
                        </Typography>
                        
                    ))}
                    <div ref={commentRef}/>
            </div>

            {user?.result?.name &&
            (
                <div style={{width:'60%'}} >
                    <Typography gutterBottom variant='subtitle1'>add comments</Typography>
                    <TextField rows={4} multiline variant='outlined' label='Comments' value={comment} onChange={(e)=>setComment(e.target.value)}  />
                    <Button style={{marginTop:'70px'}} variant='contained' color='primary' disabled={!comment} onClick={handleClick} >save</Button>
              </div>
            )}

        </div>
    )
}

export default CommentSection;