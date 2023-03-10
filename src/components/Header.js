import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "../assets/styles/generalStyle.css";
import { useSelector } from "react-redux";

const Header = (props) => {
  const {hastalarState} = useSelector((state) => state);
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            HOSPITAL
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Link className="menuLink" to="/">
              Anasayfa
            </Link>
            <Link className="menuLink" to="/hastalar">
              Hastalar
            </Link>
            <span className="menuLink">
              Sistemde Kayıtlı Hasta Sayısı : {hastalarState.hastalar.lenght}
            </span>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;


