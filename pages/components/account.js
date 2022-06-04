import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import sstyles from '../../styles/Initial.module.css'
import { app,db } from '../../firebase'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { getDoc,getDocs,doc,collection } from 'firebase/firestore'
import moment from 'moment'
import { inputUnstyledClasses } from '@mui/base'


const Account = () => {
    const auth=getAuth(app)
    const router = useRouter()
    const [user,setUser] = useState(null)
    const [data,setData] = useState(null)
    const [course,setCourse] =useState([])
    useEffect(() => {
        onAuthStateChanged(auth, (userC) => {
            if (userC) {
              
              console.log(userC)
              setUser(userC)
              const load1 = async () => {
                  const res = await getDoc(doc(db,"info",userC.email))
                  setData(res.data())
                  const res2 = await getDocs(collection(db,"info",userC.email,"sub-info"))
                  let z=[]
                  res2.forEach(doc => z=[...z,doc.id])
                  setCourse(z)
                  setData(res.data())
              }
              load1()
            } else {
              
            }
          });
    },[router.query])
    useEffect(() =>{console.log(course)},[course.length])
    return( <>

        <div className={sstyles.sBg}>
            <div style={{backgroundImage:"radial-gradient(circle at -10% -10%, hsla(236, 100%, 8%, 1) 0%, hsla(211, 100%, 28%, 1) 100%)", color:"white",padding:"30px 60px",borderRadius:"20px",width:"400px"}}>
                <h1>{user?.displayName}</h1>
                <p>Email - {user?.email}</p>
                <p>D.O.B - {moment(data?.dob.toDate()).format("MMMM Do YYYY")}</p>
                <p>Courses Enrolled : - </p>
                <div style={{marginRight:"60px",textAlign:"right"}}>{course.length > 0 && course.map((c,i) => <p key={i}>{c}</p>)}</div>
            </div>
            
            
        </div>
    </>)
}

export default Account