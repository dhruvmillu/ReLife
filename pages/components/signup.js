import React, { useState } from "react";
import bstyles from "../../styles/basic1.module.css";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { app,db } from "../../firebase";
import Stack from "@mui/material/Stack";
import { DateTimePicker } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import { doc, setDoc } from "firebase/firestore";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import iStyles from "../../styles/initial.module.css";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import validator from "validator";
import {useRouter} from 'next/router'


export default function SignUp() {

  const [page, changePg] = useState(0);
  const router = useRouter()
  const [email, setEmail] = useState(null);
  const [name,setName] = useState(null)
  const [password, setPassword] = useState(null);
  const [repass, setRepass] = useState(null)
  const [value, setValue] = useState(null);
  const [errormsg,setErrormsg] = useState(null)
  const [open, setOpen] = React.useState(false);

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function signUp() {
    const auth = getAuth(app);
    const userCredentials=await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredentials.user
    console.log(user);
    updateProfile(user, {
        displayName:name,
    })
    const res = await setDoc(doc(db,"info",email), {
        dob:value,
        events:[]
    })
  }
  const action = (
    <>
      <IconButton
      
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
        key={"topcenter"}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  const posText = () =>{
      switch(page){
          case 860: return "Submit"
          default: return "Next"
      }
  }

  const validate= () => {
    if (page == 0) {
        if(!name){
            setErrormsg("Please enter name")
            setOpen(true)
        }
        else if (!email || !validator.isEmail(email)) {
            setErrormsg("Invalid Email")
            console.log(email);
            setOpen(true)
        }
        else{
            changePg(page+430)
        }
      }
    else if (page==430){
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,32}$/
        if(!password || !repass){
            setErrormsg("All fields are required")
            console.log(email);
            setOpen(true)
        }
        
        else if(!regularExpression.test(password)){
            console.log(`Password must follow following rules:\n`+
            `1. Must 8 to 32 charaters long\n`+
            `2. Must constain one number\n3. Must have one capital letter\n4. Must have one samll letter\n`+
            `5. Must have atleast one of the symbols:-\n !@#$%^&*_-`)
            setErrormsg(`Password must follow following rules:~\n`+
            `1. Must 8 to 32 charaters long\n`+
            `2. Must constain one number\n3. Must have one capital letter\n4. Must have one samll letter\n`+
            `5. Must have atleast one of the symbols:-\n !@#$%^&*_-`)
            setOpen(true)
        }
        else if(password != repass){
            setErrormsg("Both fields should match")
            setOpen(true)
        }
        else{
            changePg(page+430)
        }
    }
    else if (page==860){
        if(!value){
            setErrormsg("Please Select Date of birth")
            setOpen(true)
        }
        else{
            signUp()
        }
    }
  }

  return (
    <div className={iStyles.signUpBg}>
        <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Note archived"
        severity="error"
        action={action}
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
      >
          <MuiAlert elevation={6}  variant="filled"  severity="error" ><div style={{display:"flex",alignItems:"center"}}><div style={{ whiteSpace: "pre-line" }}>{errormsg}</div>{action}</div></MuiAlert>
      </Snackbar>
      
      <div className={bstyles.signupHolder}>
        <div className={bstyles.cardHolder} style={{ right: page + "px" }}>
          <div className={[bstyles.card]}>
            <h1 style={{ color: "white", margin: "0px" }}>
              Start with basic Information
            </h1>
            <input placeholder="name" className={bstyles.inp} onChange={(e) => setName(e.target.value)}/>
            <input
              type={"email"}
              placeholder="email"
              className={bstyles.inp}
            //   onBlur={validate()}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={[bstyles.card]}>
            <h1 style={{ color: "white", margin: "0px" }}>
              Add Password to your account
            </h1>
            <input
              type="password"
              placeholder="password"
              className={bstyles.inp}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type={"password"}
              placeholder="re-type password"
              className={bstyles.inp}
              onChange={(e) => setRepass(e.target.value)}
            />
          </div>
          <div className={[bstyles.card]}>
            <h1 style={{ color: "white", margin: "0px" }}>
              Give us some basic details
            </h1>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Enter date of birth"
                orientation="landscape"
                value={value}
                minDate={new Date("1950-01-01")}
                maxDate={new Date()}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField sx={{ color: "success.main" }} {...params} />
                )}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-around"}}>
        <button className={bstyles.button1} onClick={() => page==0?router.push("/components/login"):changePg(page-430)}>
          {page==0?"Go to Login":"Back"}
        </button>
        <button className={bstyles.button1} onClick={() => validate()}>
          {posText()}
        </button>
        </div>
        

      </div>
    </div>
  );
}
