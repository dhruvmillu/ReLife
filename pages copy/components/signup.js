import React,{useState} from 'react';
import bstyles from "../../styles/basic1.module.css"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase';
import Stack from '@mui/material/Stack';
import { DateTimePicker } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import iStyles from "../../styles/initial.module.css"


export default function SignUp(){

    const [page,changePg] = useState(0)
    const [email,setEmail]=useState(null)
    const [password,setPassword] = useState(null)
    const [value,setValue] = useState(null)
    async function signUp(){const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });}

    return(
        <div className={iStyles.signUpBg}>
            <div>\
            </div>
            <div className={bstyles.signupHolder}>
                <div className={bstyles.cardHolder} style={{right:page+"px"}}>
                    <div className={[bstyles.card]}>
                        <h1 style={{color:"white",margin:"0px"}}>Start with basic Information</h1>
                        <input placeholder='name' className={bstyles.inp} />
                        <input type={"email"} placeholder="email" className={bstyles.inp} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className={[bstyles.card]}>
                    <h1 style={{color:"white",margin:"0px"}}>Add Password to your account</h1>
                        <input type="password" placeholder='password' className={bstyles.inp} onChange={(e)=> setPassword(e.target.value)}/>
                        <input type={"password"} placeholder="re-type password" className={bstyles.inp}/>
                    </div>
                    <div className={[bstyles.card]}>
                    <h1 style={{color:"white",margin:"0px"}}>Give us some basic details</h1>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Enter date of birth"
                            orientation="landscape"
                            value={value}
                            minDate={new Date('1950-01-01')}
                            maxDate={new Date()}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField sx={{color:"success.main"}} {...params}/>}
                        />
                    </LocalizationProvider>
                    </div>
                </div>
                
                <button className={bstyles.button1} onClick={() => changePg(page+430)}>next</button>
                

            </div>
        </div>
        )
}