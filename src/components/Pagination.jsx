import React,{useEffect} from 'react'
import {Pagination,PaginationItem} from '@material-ui/lab'
import useStyles from './styles'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getPosts} from '../actions/posts'
function Paginate({page}) {
    const classes=useStyles()
    const dispatch=useDispatch()
    const {numberOfPage}=useSelector((state)=>state.posts)
    
    useEffect(()=>{
      if(page) dispatch(getPosts(page))
    },[page])
  return (
    <Pagination
    classes={{ui:classes.ui}}
    count={numberOfPage}
    page={Number(page)}
    variant='outlined'
    color='primary'
    renderItem={((item)=>(
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
    ))}

    />
  )
}

export default Paginate