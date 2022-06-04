import React from "react";
import bstyles from "../../styles/basic1.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
import { useState,useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc,doc } from "firebase/firestore";
import { app,db } from '../../firebase';
import {
  Input,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const Volunteer = () => {
  const [expanded, setExpanded] = useState(false);
  const auth = getAuth(app)
  const [data,setData] = useState(null)
  const [user,setUser] = useState(null)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  useEffect(() =>{
    onAuthStateChanged(auth, (userC) => {
      if (userC) {
        
        console.log(userC.email)
        setUser(userC)
        const load = async () =>{
          const res = await getDoc(doc(db,"info",userC.email,"sub-info","volunteer"))
          console.log(res.data().progress)
          setData(res.data())
        }
        load()
        // ...
      } else {
        
      }
    });
  },[])
  return (
    <div style={{ display: "flex" }}>
      
      <div className={bstyles.rSteps}>
        <p>Recurring Steps</p>
        <div>
          <Card
            style={{ border: "1px solid #a0a0a0" }}
            sx={{
              minWidth: 255,
              maxWidth: 300,
              boxShadow: "10px 10px 10px #000",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2.5 }}>
                Support group meetings
              </Typography>
              <Typography sx={{ mb: 2.5 }} color="text.secondary">
                You are not alone in this world. Come and meet others having
                same life as you
              </Typography>
              <Typography variant="body2">Meetings attended - {data?.progress.total_participation}</Typography>
            </CardContent>
          </Card>
          <Accordion
              sx={{ maxWidth: 500 }}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography
                  style={{ display: "flex", alignItems: "center" }}
                  sx={{ width: "33%", flexShrink: 0 }}
                >
                  Volunteer work{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Show case all you volunteer work
                </Typography>
              </AccordionDetails>
            </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
