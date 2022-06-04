import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { app } from "../../firebase";
import hstyles from "../../styles/Home.module.css"
import { getAuth, onAuthStateChanged } from "firebase/auth";

const StarterPage = () => {
  const auth = getAuth(app);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        router.push("/components/mainpage");
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [auth.currentUser]);

  return (
    <>
      <div  style={{fontSize:"20px"}} >
        <div className={hstyles.bg} style={{justifyContent:"center",fontSize:"250px"}}>ReLife</div>
        <div className={hstyles.bg}>
          <div className={hstyles.bgsub}>Ex-Convict (or ex-offender or former inmate or probationer) is/are one
          of the various names a person can have. In simple term, it means
          former prisoner. Labelling every prisoner as an ex-convict has led to
          a major misunderstanding in the society. People view every ex-convict
          on the same level. Even if they stole something and went to jail, they
          are treated as if they committed a murder. This has led to a huge
          problem of separation of these people from the rest of the society.
          They aren’t able to reintegrate back into the society and earn a
          livelihood normally. Hence, they go back to the old means of
          committing crime to earn themselves some bread and get stuck in an
          endless loop of no return.</div>
          
        </div>
        <div className={hstyles.bg}><div>
          Studies have shown that 83% of released prisoners are rearrested with
          a decade. Ex-convicts are often not allowed to vote, they struggle to
          find work and people think they are still dangerous and bad people. In
          other words, ex-prisoners are rejected from the society they are
          trying to re-enter and this rejection makes life after prison
          stressful and depressing. And what does this do? Stressed and unhappy
          ex-offenders reoffend.</div>
        </div>
        <div className={hstyles.bg}><div>
          Addiction is defined as a chronic, relapsing disorder characterized by
          compulsive drug seeking, continued use despite harmful consequences,
          and long-lasting changes in the brain. It is an inability to stop
          using a substance or engaging in a behaviour even though it is causing
          psychological and physical harm. It is considered both a complex brain
          disorder and a mental illness. Addiction is the most severe form of a
          full spectrum of substance use disorders, and is a medical illness
          caused by repeated misuse of a substance or substances.</div>
        </div>
        <div className={hstyles.bg}><div>
          Addictive substances are chemicals that affect the body’s functioning.
          A person who is addicted focuses only on the rewards of the substance.
          He is likely to shirk personal and professional responsibilities, and
          avoid family and friends because he wishes to focus only on the habit.
          This addiction gradually affects his work and close relationships.</div>
        </div>
        <div className={hstyles.bg}><div>
          Hence, we are able to see that being an ex-convict makes it harder for
          you to reintegrate with society and being an addicted person makes it
          harder for you to live a healthy normal life. People often, knowingly
          or unknowingly, discriminate against ex-convicts and/or addicted
          people making a visible line of distinction between them and hence the
          gap only widens.</div>
        </div>
        <div className={hstyles.bg}>
          <div>
          Our aim is to lessen that gap and eventually remove it. We plan on
          doing this with the help of this project and an in-depth course
          tailored for each person to help them improve themselves. In return
          improving their standard of living and hence leaving the loop they
          would have been stuck in. This reintegration of people leads to a
          healthy society with reduced number of criminals and increased number
          of healthy people. It also decreases the demand of harmful items.</div>
          <button onClick={() => router.push("/components/signup")} className={hstyles.bgB}>Join us</button>
        </div>
        
      </div>
    </>
  );
};

export default StarterPage;
