import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import sstyles from "../../styles/Initial.module.css";
import { app, db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AddIcon from "@mui/icons-material/Add";
import Volunteer from "./volunteer";
import CloseIcon from "@mui/icons-material/Close";
import {
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  serverTimestamp,
  arrayUnion,
  updateDoc
} from "firebase/firestore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import ExConvictCourse from "./exConvictCourse";
import AddictionCourse from "./addictionCourse";
import img1 from "../../public/shutterstock_1464234134-1024x684.jpg";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  TextField,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import moment from "moment";

const DashBoard = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState(null);
  const [edu, setEdu] = useState(null);
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [months, setMonths] = useState(0);
  const [reason, setReason] = useState(null);

  const submit = async () => {
    console.log(user.email);
    if (user) {
      try {
        let progress,events=[];

        if (value == "ex-convict") {
          for (let i=1; i<=26; i++){
            let d = new Date(moment("2022-05-08").add(14*i,'days'))
            console.log(edu)
            events.push({date:d,title:"Support group",time:"6:00PM to 7:00PM",course:"ex-convict"})
          }
          if (edu == "Yes") {
            progress = {
              basicEdu: {
                maths: {
                  test_1: {
                    tries: 0,
                    max: 0,
                    min: 0,
                  },
                  test_2: {
                    tries: 0,
                    max: 0,
                    min: 0,
                  },
                },
                english: {
                    test_1: {
                      tries: 0,
                      max: 0,
                      min: 0,
                    },
                    test_2: {
                      tries: 0,
                      max: 0,
                      min: 0,
                    },
                },
                science: {
                  test_1: {
                    tries: 0,
                    max: 0,
                    min: 0,
                  },
                  test_2: {
                    tries: 0,
                    max: 0,
                    min: 0,
                  },
                },
              },
              skill: {
                skill_1: {
                  name: null,
                  certificate_link: null,
                },
                skill_2: {
                  name: null,
                  certificate_link: null,
                },
              },
              charityWork: [],
              support_grp: {
                meeting_attended: 0,
              },
            };
          } else {
            progress = {
              skill: {
                skill_1: {
                  name: null,
                  certificate_link: null,
                },
                skill_2: {
                  name: null,
                  certificate_link: null,
                },
              },
              charityWork: [],
              support_grp: {
                meeting_attended: 0,
              },
            };
          }
        }
        if (value == "addiction") {
            for (let i=1; i<=26; i++){
              let d = new Date(moment("2022-05-07").add(14*i,'days'))
              console.log(d)
              events.push({date:d,title:"Support group",time:"6:00PM to 7:00PM",course:"addiction"})
          }
          for (let i=1; i<=26; i++){
            let d = new Date(moment("2022-05-05").add(14*i,'days'))
            console.log(d)
            events.push({date:d,title:"Meditation Session",time:"6:00PM to 7:00PM",course:"addiction"})
        }
          if (edu == "Yes") {
            progress = {
              basicEdu: {
                maths: {
                  test_1: {
                    tries: 0,
                    max: 0,
                    min: 0,
                  },
                  test_2: {
                    tries: 0,
                    max: 0,
                    min: 0,
                  },
                },
                english: {
                    test_1: {
                      tries: 0,
                      max: 0,
                      min: 0,
                    },
                    test_2: {
                      tries: 0,
                      max: 0,
                      min: 0,
                    },
                },
                science: {
                  test_1: {
                    tries: 0,
                    max: 0,
                    min: 0,
                  }, 
                  test_2: {
                    tries: 0,
                    max: 0,
                    min: 0,
                  },
                },
              },
              skill: {
                skill_1: {
                  name: null,
                  certificate_link: null,
                },
                skill_2: {
                  name: null,
                  certificate_link: null,
                },
              },
              charityWork: [],
              support_grp: {
                meeting_attended: 0,
              },
              meditation: {
                sessions_attended: 0,
              },
            };
          } else {
            progress = {
              skill: {
                skill_1: {
                  name: null,
                  certificate_link: null,
                },
                skill_2: {
                  name: null,
                  certificate_link: null,
                },
              },
              charityWork: [],
              support_grp: {
                meeting_attended: 0,
              },
              meditation: {
                sessions_attended: 0,
              },
            };
          }
        }
        if (value == "volunteer") {
            for (let i=1; i<=26; i++){
              let d = new Date(moment("2022-05-07").add(10*i,'days'))
              console.log(d)
              events.push({date:d,title:"event",time:"6:00PM to 7:00PM",course:"volunteer"})
            }
          progress={
            total_participation:0,
            participation_details:[]
          }
        }
        await updateDoc(doc(db,"info",user.email),{
            events:arrayUnion(...events)
        },{merge:true})
        await setDoc(
          doc(db, "info", user.email, "sub-info", value),
          {
            educationRequired: edu,
            joined: await serverTimestamp(),
            progress
          }
        );
        setOpen(!open);
        router.reload(window.location.pathname)
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const loadData = async (userCred) => {
    const docRef = collection(db, "info", userCred.email, "sub-info");
    getDocs(docRef).then((docs) => {
      let z = [];
      docs.forEach((doc) => (z = [...z, { id: doc.id, data: doc.data() }]));
      setData(z);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userCredentials) => {
      if (userCredentials) {
        setUser(userCredentials);
        router.push("/components/mainpage");
        setData([]);
        loadData(userCredentials);
        // ...
      } else {
        // User isdd signed out
        // ...
      }
    });
  }, [auth.currentUser]);
  useEffect(() => {
    console.log(data);
  }, [data.length]);
  const foo = () => {
    switch (value) {
      case "ex-convict":
        return (
          <div style={{ marginTop: "20px", widht: "100%" }}>
            <Divider width={"500vw"} />
            <div style={{ marginTop: "20px", widht: "100%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "20px", padding: "10px" }}>
                  Whether Basic Education required?
                </span>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setEdu(e.target.value)}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  widht: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <h3>What you will learn</h3>
                <ul
                  style={{
                    border: "1px black solid",
                    padding: "30px",
                    lineHeight: "20px",
                  }}
                >
                  {edu == "Yes" ? (
                    <li style={{ paddingBottom: "15px" }}>
                      Basic maths, science and english
                    </li>
                  ) : null}
                  <li style={{ paddingBottom: "15px" }}>
                    English Speaking skill
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    Participation in support groups
                  </li>
                  <li style={{ paddingBottom: "15px" }}>Skill building</li>
                </ul>
              </div>
            </div>
            <button className={sstyles.submitForm} onClick={() => submit()}>
              Submit
            </button>
          </div>
        );
      case "addiction":
        return (
          <div style={{ marginTop: "20px", widht: "100%" }}>
            <Divider width={"500vw"} />
            <div style={{ marginTop: "20px", widht: "100%" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "20px", padding: "10px" }}>
                  Whether Basic Education required?
                </span>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setEdu(e.target.value)}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  widht: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <h3>What you will learn</h3>
                <ul
                  style={{
                    border: "1px black solid",
                    padding: "30px",
                    lineHeight: "20px",
                  }}
                >
                  {edu == "Yes" ? (
                    <li style={{ paddingBottom: "15px" }}>
                      Basic maths, science and english
                    </li>
                  ) : null}
                  <li style={{ paddingBottom: "15px" }}>
                    English Speaking skill
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    Participation in meets
                  </li>
                  <li style={{ paddingBottom: "15px" }}>Skill building</li>
                  <li style={{ paddingBottom: "15px" }}>Mediatation</li>
                  <li style={{ paddingBottom: "15px" }}>
                    Methods to control addiction
                  </li>
                </ul>
              </div>
            </div>
            <button className={sstyles.submitForm} onClick={() => submit()}>
              Submit
            </button>
          </div>
        );
      case "volunteer":
        return (
          <div style={{ marginTop: "20px", widht: "100%" }}>
            <Divider width={"500vw"} />
            <div style={{ marginTop: "20px", widht: "100%" }}>
              <div style={{}}>
                <div style={{ marginRight: "20px", padding: "10px" }}>
                  Do you have any previous experience working with NGOs and
                  Volunteering?
                </div>
                <FormControl style={{ padding: "10px" }}>
                  <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setEdu(e.target.value)}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  widht: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <h3>What you will do</h3>
                <ul
                  style={{
                    border: "1px black solid",
                    padding: "30px",
                    lineHeight: "20px",
                  }}
                >
                  <li style={{ paddingBottom: "15px" }}>
                    Teach Basic maths, science and english
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    Help in English Speaking skill
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    organise and conduct various meets
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    organise support group
                  </li>
                  <li style={{ paddingBottom: "15px" }}>spread awareness</li>
                </ul>
              </div>
            </div>
            <button className={sstyles.submitForm} onClick={() => submit()}>
              Submit
            </button>
          </div>
        );
    }
  };
  return (
    <>
      <div style={{ height: "100vh", padding: "0px 50px" }}>
        <div style={{ padding: "20px" }}>
          {data && data.length > 0 ? (
            <div className={sstyles.cardHolderStyle}>
              {data.map((doc,i) => (
                <div key={i}className={sstyles.cardStyle}>
                  <p className={sstyles.cHeading}>
                    {doc.id == "volunteer"
                      ? "VOLUNTEER"
                      : doc.id.toUpperCase() + " COURSE"}
                  </p>
                  <p className={sstyles.cText}>
                    Joined on -{" "}
                    {doc.data &&
                      moment(doc.data.joined.toDate()).format("MMMM Do YYYY")}
                  </p>
                  <div
                    className={sstyles.cDown}
                    onClick={() => {
                      setOpen2(!open2);
                      setName(doc.id);
                    }}
                  >
                    <p>Open</p>
                    <div>
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{fontSize:"50px"}}>Click on + to start your journey</p>
          )}
        </div>
        <Dialog
          fullScreen
          open={open}
          hideBackdrop
          onClose={() => setOpen(!open)}
          style={{ backgroundColor: "black" }}
        >
          <AppBar style={{ backgroundColor: "#202020" }}>
            <Toolbar>
              <IconButton
                onClick={() => setOpen(!open)}
                style={{ color: "white" }}
              >
                <CloseIcon color="white" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Start a new course
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            padding={5}
            paddingTop={10}
            style={{ display: "flex", transition: "0.5s" }}
          >
            <FormControl
              style={{ width: "800px", marginLeft: "50px", marginTop: "50px" }}
            >
              <FormLabel id="demo-radio-buttons-group-label">
                Choose a course
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="volunteer"
                name="radio-buttons-group"
                value={value}
                onChange={(e) => {
                  console.log(e.target.value);
                  setValue(e.target.value);
                }}
              >
                <FormControlLabel
                  value="ex-convict"
                  control={<Radio />}
                  label="ex - convict rehab course"
                />
                <FormControlLabel
                  value="addiction"
                  control={<Radio />}
                  label="Addiction rehab course"
                />
                <FormControlLabel
                  value="volunteer"
                  control={<Radio />}
                  label="Volunteer"
                />
              </RadioGroup>
              {foo()}
            </FormControl>
            <div>
              <Image src={img1} width={880} />
            </div>
          </Box>
        </Dialog>
        <Dialog
          fullScreen
          open={open2}
          hideBackdrop
          onClose={() => setOpen2(!open2)}
          style={{ backgroundColor: "black" }}
        >
          <AppBar style={{ backgroundColor: "#202020" }}>
            <Toolbar>
              <IconButton
                onClick={() => setOpen2(!open2)}
                style={{ color: "white" }}
              >
                <CloseIcon color="white" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {name
                  ? name == "volunteer"
                    ? "VOLUNTEER"
                    : name.toUpperCase() + " COURSE"
                  : null}
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            padding={5}
            paddingTop={10}
            style={{ display: "flex", transition: "0.5s" }}
          >
            <div style={{ marginRight: "30px" }}>
              {name == "ex-convict" ? <ExConvictCourse /> : null}
              {name == "addiction" ? <AddictionCourse /> : null}
              {name == "volunteer" ? <Volunteer /> : null}
            </div>
            <div>
              <Image
                style={{ alignSelf: "center", justifySelf: "flex-end" }}
                src={img1}
                width={680}
                height={400}
              />
            </div>
          </Box>
        </Dialog>
        <button className={sstyles.ic} onClick={() => setOpen(!open)}>
          <div>
            <AddIcon className={sstyles.ici} />
          </div>
        </button>
      </div>
    </>
  );
};

export default DashBoard;
