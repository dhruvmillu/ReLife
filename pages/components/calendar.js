import { doc, getDoc } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import  Calendar  from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import bstyles from "../../styles/basic1.module.css"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app,db } from '../../firebase';
import moment from 'moment';

const CalendarView= () =>{
    const [value, onChange] = useState(new Date());
    const [user,setUser] = useState(null)
    const [event, setEvents] = useState([])
    const [eventDetails, setEDetails] = useState(null)
    const auth = getAuth(app)
    useEffect(()=>{
        onAuthStateChanged(auth, (userC) => {
            if (userC) {
              
              console.log(userC)
              setUser(userC)
              // ...
            } else {
              
            }
          });
    },[])
useEffect(()=>{
    console.log(value)
    if(event.length>0){
        setEDetails(null)
        for(let i=0;i<event.length;i++){
            if(event[i].date.toDate().getTime()==value.getTime()){
                console.log(event[i])
                setEDetails(event[i])
                break
            }
        }
    }

},[value])
    useEffect(()=>{
        if(user){
            const load = async () =>{
                const res = await getDoc(doc(db,"info",user.email))
                console.log(res.data().events)
                setEvents(res.data().events)
            }
            load()
        }
    },[user])

    return(
        <div style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}>
            <div className={bstyles.eventStyle}>
                <h1 style={{color:"white"}}>Events</h1>
                <div>
                    {eventDetails?<div>
                        <h2 style={{color:"white"}}>{eventDetails.title}</h2>
                        <h3 style={{color:"white"}}>course - {eventDetails.course}</h3>
                        <h5 style={{color:"white"}}>time - {eventDetails.time}</h5>
                    </div>:<p style={{color:"white"}}>No events today</p>}
                </div>
            </div>
            <Calendar onChange={onChange} value={value} />
        </div>
        )

}

export default CalendarView