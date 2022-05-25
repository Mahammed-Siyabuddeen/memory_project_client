import { Button, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch} from 'react-redux';
import { commentPost } from '../../actions/posts';
import useStyle from './styles'
function CommentSection({post}){
    const classes=useStyle();
    const[comments,setComments]=useState(post?.comments)
    const[comment,setComment]=useState('')
    const user=JSON.parse(localStorage.getItem('profile'))
    const dispatch=useDispatch()
    const commentRef=useRef()


    const handleClick=async()=>{
       var finalComment=`${user.result?.name} :${comment}`;
        dispatch(commentPost(finalComment,post._id))
  
     setComments([...comments,finalComment])
     setComment('')
    }
    useEffect(()=>{
        commentRef.current.scrollIntoView({behavior:'smooth'})
    },[comments])
    return(
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6' >Comments</Typography>
                     
                    {comments.map((comment,i)=>(
                        <Typography key={i} variant='subtitle1'>
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