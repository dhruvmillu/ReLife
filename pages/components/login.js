import React, { useState } from "react";
import bstyles from "../../styles/basic1.module.css";
import { getAuth, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { app,db } from "../../firebase";
import Snackbar from '@mui/material/Snackbar';
import { doc, setDoc } from "firebase/firestore";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import iStyles from "../../styles/initial.module.css";
import MuiAlert from '@mui/material/Alert';
import {useRouter} from 'next/router'


export default function Login() {

  const router = useRouter()
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errormsg,setErrormsg] = useState(null)
  const [open, setOpen] = React.useState(false);

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function login() {
    const auth = getAuth(app);
    const userCredentials=await signInWithEmailAndPassword(auth, email, password)
    const user = userCredentials.user
    console.log(user);
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
  )

 

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
        <div className={bstyles.cardHolder}>
          <div className={[bstyles.card]}>
            <h1 style={{ color: "white", margin: "0px" }}>
              Enter your credentials to login
            </h1>
            <input
              type={"email"}
              placeholder="email"
              className={bstyles.inp}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" placeholder="password" className={bstyles.inp} onChange={(e) => setPassword(e.target.value)}/>
            
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-around"}}>
        <button className={bstyles.button1} onClick={() => router.push("/components/signup")}>
          Sign Up
        </button>
        <button className={bstyles.button1} onClick={() => login()}>
          Login
        </button>
        </div>
        

      </div>
    </div>
  );
}
