import React ,{useState,useEffect} from 'react'
import { Container, AppBar, Typography, Grow, Grid,Button,Avatar,Toolbar } from '@material-ui/core';
import useStyles from './styles';
import Posts from '../Posts/Posts';
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import {Link,useLocation,useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {LOGOUT} from '../../constants/actionTypes'
import decode from 'jwt-decode';

function Navbar({user,setUser}) {
 
  // const [user,setuser]=useState(JSON.parse(localStorage.getItem('profile')))
  const classes=useStyles()
  const dispatch=useDispatch()
  const location=useLocation()
  const history=useHistory()
  // console.log(user);

  const logout=()=>{
  
    dispatch({type:LOGOUT})
    history.push('/')
    setUser(null)
  }
  
  useEffect(()=>{
   const token=user?.token
   
   if(token){
     const decodeToken=decode(token);
     
     if(decodeToken.exp*1000 <new Date().getTime())
     dispatch({type:LOGOUT})
     
    }
  
  setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])
  return (
    <AppBar  className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
          <img  className={classes.image} src={memoriesText} alt="memory" height="45px" />
          <img className={classes.image} src={memoriesLogo} alt='logo' height='40px' />
       </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}></Avatar>
            <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
          </div>
        ):(
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
     </Toolbar>
  
  </AppBar>
  )
}

export default Navbar