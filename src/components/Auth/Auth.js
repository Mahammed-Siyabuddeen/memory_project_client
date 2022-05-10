import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";
import {SignIn,signUp} from '../../actions/auth'
import Alert from '@material-ui/lab/Alert';
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  confirmPassword: "",
};
function Auth() {
  const [isSignup, setisSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [Error,setError]=useState(null)
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  
  const handleShowPassword = () => {
    setShowPassword((prevpassword)=>!prevpassword)
  };
  var handleSubmit = async(e) => {
    e.preventDefault();
    if(isSignup){
      var err=await  dispatch(signUp(form,history));
       setError(err)
    }
    else{
        err=await dispatch(SignIn(form,history))
        setError(err)
    }
  };
  var handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  var switchMode = () => {
    setForm(initialState)
    setisSignup((prevIsSignup) => !prevIsSignup);
  };
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
    }
  };
  const googleError = (error) => {
    console.log(error);
  };
  return (
    <Container component="main" maxWidth="xs">
   {Error && <Alert severity="error">{Error} — check it out!</Alert>}
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <div>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </div>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="60005052559-brspuls1lrsn7lh08sdkk1i27c34c4qh.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cokiePolicy="single_host_origin"
          />

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an Account? Sign In"
                  : "Don't have account Signup"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
