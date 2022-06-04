import Head from 'next/head'
import Image from 'next/image'
import sstyles from '../styles/Initial.module.css'
import StarterPage from '../pages/components/starter-page'
import SignUp from '../pages/components/signup'

export default function Home() {
  return (
    <div>
      <StarterPage/>
    </div>
  )
}
