import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import sstyles from '../../styles/Initial.module.css'
import bstyles from '../../styles/basic1.module.css'
import { app } from '../../firebase'
import DashBoard from './dashboard'
import Account from './account'
import SideMenu from './side-menu'
import CalendarView from './calendar'
import { getAuth,onAuthStateChanged } from 'firebase/auth'


const MainPage = () => {
    const auth=getAuth(app)
    const [pg,setPg] = useState("Dashboard")
    const router = useRouter()

    const foo = () => {
        switch (pg) {
            case "Account":return <Account/>
            case "calendar":return <CalendarView/>
        
            default: return <DashBoard/>
        }
    }

    useEffect(() => {
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
              
              console.log(user)
              router.push("/components/mainpage")
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    },[auth.currentUser])
    useEffect(() => {
        if(router.query.page){
            setPg(router.query.page)
          }
    },[router.query])
    

    return( <>

    <div className={bstyles.mainpage}>
        <div>
            <SideMenu/>
        </div>
        <div>

            {foo()}
        </div>
        
    </div>
    </>)
}

export default MainPage