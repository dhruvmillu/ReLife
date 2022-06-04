import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { app } from "../../firebase";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import basicStyle from "../../styles/basic1.module.css";

const SideMenu = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [page, setPage] = useState("dashboard");
  const[user, setUser] = useState(null);
  const signOUT = async () => {
    const res = await signOut(auth);
    
    console.log(res);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (userC) => {
      if (userC) {
        console.log(userC);
        setUser(userC);
        console.log(router.query);
        if (router.query.page) {
          setPage(router.query.page);
        }
        // ...
      } else {
      }
    });
  }, [router.query]);

  return (
    <>
      <div style={{ height: "100vh", backgroundColor: "#202020" }}>
        <List className={basicStyle.lstyle}>
          <ListItem>
            <ListItemButton
              onClick={() =>
                router.push({
                  pathname: "/components/mainpage",
                  query: { page: "dashboard" },
                })
              }
              className={basicStyle.litemstyle}
            >
              <div style={{color:"white"}}>
                Welcome<br/>{user && user.displayName}
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() =>
                router.push({
                  pathname: "/components/mainpage",
                  query: { page: "dashboard" },
                })
              }
              className={basicStyle.litemstyle}
            >
              <div>
                {page == "dashboard" ? (
                  <ArrowForwardIosIcon style={{ marginRight: "20px" }} />
                ) : null}
                DashBoard
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() =>
                router.push({
                  pathname: "/components/mainpage",
                  query: { page: "calendar" },
                })
              }
              className={basicStyle.litemstyle}
            >
              <div>
                {page == "calendar" ? (
                  <ArrowForwardIosIcon style={{ marginRight: "20px" }} />
                ) : null}
                Calendar
              </div>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton
              onClick={() =>
                router.push({
                  pathname: "/components/mainpage",
                  query: { page: "Account" },
                })
              }
              className={basicStyle.litemstyle}
            >
              <div>
                {page == "Account" ? (
                  <ArrowForwardIosIcon style={{ marginRight: "20px" }} />
                ) : null}
                Account
              </div>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                signOUT();
                router.replace("/");
              }}
              className={basicStyle.litemstyle}
            >
              <div style={{}}>Sign Out</div>
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default SideMenu;
