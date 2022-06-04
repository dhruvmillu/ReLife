import React,{useState,useEffect} from "react";
import bstyles from "../../styles/basic1.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";
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
import { fontWeight } from "@mui/system";

const ExConvictCourse = () => {
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
          const res = await getDoc(doc(db,"info",userC.email,"sub-info","ex-convict"))
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
      <div className={bstyles.cSteps}>
        <p>Course path</p>
        <div>
          <div className={bstyles.rSteps}>
            {data?.progress.basicEdu?<Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              sx={{ maxWidth: 500 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Basic Education
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Complete the following unit to move to the next
                </Typography>
                <div>
                  <p>watch the following videos to gain basic education</p>
                  <ol>
                    <li>
                      <b>Mathematics</b> -{" "}
                      <a
                        href="https://youtube.com/playlist?list=PLMcpDl1Pr-viA25VUkHNmcUkWx9usPgyb"
                        className={bstyles.link1}
                        target={"#"}
                      >
                        Link for Classes
                      </a>{" "}
                      <br />
                      <br />
                      <a
                        className={bstyles.link1}
                        href="https://forms.gle/RVvMdJ7cePxXLU8D7"
                      >
                        Test 1
                      </a>{" "}
                      <p>Attempts - {data?.progress.basicEdu?.maths.test_1.tries}</p>
                      <p>Max marks - {data?.progress.basicEdu?.maths.test_1.max}</p>{" "}
                      <a
                        href="https://forms.gle/RVvMdJ7cePxXLU8D7"
                        className={bstyles.link1}
                      >
                        Test 2
                      </a>{" "}
                      <p>Attempts - {data?.progress.basicEdu?.maths.test_2.tries}</p>
                      <p>Max marks - {data?.progress.basicEdu?.maths.test_2.max}</p>
                    </li>
                    <li>
                      <b>Science</b> -{" "}
                      <a
                        href="https://youtube.com/playlist?list=PLmNPR-rsJVqYurQWCUwEww9oWCcVvKEmi"
                        className={bstyles.link1}
                        target={"#"}
                      >
                        Link for Classes
                      </a>{" "}
                      <br />
                      <br />
                      <a
                        className={bstyles.link1}
                        href="https://forms.gle/RVvMdJ7cePxXLU8D7"
                      >
                        Test 1
                      </a>{" "}
                      <p>Attempts - {data?.progress.basicEdu?.science.test_1.tries}</p>
                      <p>Max marks - {data?.progress.basicEdu?.science.test_1.max}</p>{" "}
                      <a
                        href="https://forms.gle/RVvMdJ7cePxXLU8D7"
                        className={bstyles.link1}
                      >
                        Test 2
                      </a>{" "} 
                      <p>Attempts - {data?.progress.basicEdu?.science.test_2.tries} </p>
                      <p>Max marks - {data?.progress.basicEdu?.science.test_2.max}</p>
                    </li>
                    <li>
                      <b>English</b> -{" "}
                      <a
                        href="https://youtube.com/playlist?list=PLmNPR-rsJVqYurQWCUwEww9oWCcVvKEmi"
                        className={bstyles.link1}
                        target={"#"}
                      >
                        Link link for Classes
                      </a>{" "}
                      <br />
                      <br />{" "}
                      <a
                        className={bstyles.link1}
                        href="https://forms.gle/RVvMdJ7cePxXLU8D7"
                      >
                        Test 1
                      </a>{" "}
                      <p>Attempts - {data?.progress.basicEdu?.english.test_1.tries}</p>
                      <p>Max marks - {data?.progress.basicEdu?.english.test_1.max}</p>{" "}
                      <a
                        href="https://forms.gle/RVvMdJ7cePxXLU8D7"
                        className={bstyles.link1}
                      >
                        Test 2
                      </a>{" "}
                      <p>Attempts - {data?.progress.basicEdu?.english.test_2.tries}</p>
                      <p>Max marks - {data?.progress.basicEdu?.english.test_2.max}</p>
                    </li>
                  </ol>
                </div>
              </AccordionDetails>
            </Accordion>:null
            }
            {console.log(data?.progress.basicEdu?data?.progress.basicEdu?.maths.test_1.max > 5 && data?.progress.basicEdu?.maths.test_2.max > 5 && data?.progress.basicEdu?.english.test_1.max > 5 && data?.progress.basicEdu?.english.test_1.max > 5 && data?.progress.basicEdu?.science.test_1.max > 5 && data?.progress.basicEdu?.science.test_2.max > 5?expanded === "panel2":null:expanded === "panel2")}
            <Accordion
              sx={{ maxWidth: 500 }}
              expanded={data?.progress.basicEdu?data?.progress.basicEdu?.maths.test_1.max > 5 && data?.progress.basicEdu?.maths.test_2.max > 5 && data?.progress.basicEdu?.english.test_1.max > 5 && data?.progress.basicEdu?.english.test_1.max > 5 && data?.progress.basicEdu?.science.test_1.max > 5 && data?.progress.basicEdu?.science.test_2.max > 5?expanded === "panel2":null:expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography
                  style={{ display: "flex", alignItems: "center" }}
                  sx={{ flexShrink: 0 }}
                >
                  Learn Skills
                  {data?.progress.basicEdu?.maths.test_1.max > 5 && data?.progress.basicEdu?.maths.test_2.max > 5 && data?.progress.basicEdu?.english.test_1.max > 5 && data?.progress.basicEdu?.english.test_1.max > 5 && data?.progress.basicEdu?.science.test_1.max > 5 && data?.progress.basicEdu?.science.test_2.max > 5?null:!data?.progress.basicEdu?null:<span style={{ marginLeft: "20px" }} color="white"><LockIcon />
                  </span>}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Register on Skill India Portal and Learn 2 Skills
                </Typography>
                <br />
                <a
                  href="https://www.skillindia.gov.in"
                  target={"#"}
                  className={bstyles.link1}
                >
                  Skill India Portal
                </a>
                <p>
                  <Input type="file" />
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{ maxWidth: 500 }}
              expanded={data?.progress.skill.skill_1.name ||data?.progress.skill.skill_2.name?expanded === "panel3":null}
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
                  Charity work{" "}
                  {data?.progress.skill.skill_1.name ||data?.progress.skill.skill_2.name?null:<span style={{ marginLeft: "20px" }} color="white">
                    <LockIcon />
                  </span>}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  work with NGO&apos;s to improve your social skills and character reputation
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
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
              <Typography variant="body2">Meetings attended - {data?.progress.support_grp.meeting_attended}</Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExConvictCourse;
