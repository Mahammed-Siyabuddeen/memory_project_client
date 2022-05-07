import {SIGNIN,SIGNUP,AUTH} from '../constants/actionTypes'
import * as api from '../api/index.js'
export const signUp=(formData,router)=>async(dispatch)=>{
    try {
        const {data}=await api.signUp(formData)
        dispatch({type:AUTH,data})
        router.push('/')
    } catch ({response}) {
        console.log(response.data.message);
        return response.data.message;
        
    }

}
export const SignIn=(formData,router)=>async(dispatch)=>{
   try {
       const {data}=await api.signIn(formData);
       dispatch({type:AUTH,data})
       router.push('/')
   } catch ({response}) {
       console.log(response.data.message);
       return response.data.message;
   }

}
