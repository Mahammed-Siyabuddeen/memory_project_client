import React, { useState } from "react";
import { Container,} from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
const App = () => {
    const[User,setUser]=useState(JSON.parse(localStorage.getItem("profile")))  

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar user={User} setUser={setUser} />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route
            path="/auth"
            exact
            component={() => (!User ? <Auth /> : <Redirect to="/posts" />)}
          />
          <Route path="/posts/:id" exact component={PostDetails} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;