import React, { useEffect, useState } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { getPosts, getSearchPost ,Demo} from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from "./styles";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Home() {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const classes = useStyles();
console.log(page,searchQuery);
  const searchPost = () => {

    if (search.trim() || tags) {
      dispatch(getSearchPost({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(',')}`
        );
      } else {
        history.push("/");
      }
  };
 
  const handlekeyPress = (e) => {
    if (e.keyCode === 13) searchPost();
  };
  const handleAdd = (tage) => setTags([...tags, tage]);
  const handleDetete = (tagToDetete) =>
    setTags(tags.filter((tag) => tag !== tagToDetete));

if(!search &&  searchQuery && !tags.length){
      history.push('/')
}
   console.log(tags);
  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.gridContainer}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  
                  onChange={(e) => setSearch(e.target.value)}
                />
                <ChipInput
                  style={{ margin: "10px 0" }}
                  value={tags}
                  onKeyPress={handlekeyPress}
                  onAdd={handleAdd}
                  onDelete={handleDetete}
                  variant="outlined"
                  label="Search-tages"
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained"
                >
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!searchQuery && !tags.length && (
                <Paper elevation={6} className={classes.pagination}>
                  <Pagination page={page} elevation={6} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default Home;
