import React,{useEffect} from 'react'
import {Pagination,PaginationItem} from '@material-ui/lab'
import useStyles from './styles'
import {Link,useLocation} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getPosts} from '../actions/posts'
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Paginate({page}) {
  const query=useQuery()
  const pag=query.get('page')
  console.log(pag);
    const classes=useStyles()
    const dispatch=useDispatch()
    const {numberOfPage}=useSelector((state)=>state.posts)
    
    useEffect(()=>{
      if(page) dispatch(getPosts(page))
    },[pag])
    
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