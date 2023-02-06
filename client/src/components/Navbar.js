import * as React from "react";
import { Link } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";

import LogoutForm from "../pages/Logout/";
import auth from "../utils/auth";

const pages = ["Feed", "Profile", "Add Pet"];

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#405C96" }}>
      <Container maxWidth="xl" sx={{ backgroundColor: "#405C96" }}>
        <Toolbar disableGutters>
          {/* PETPALS logo */}
          <PetsIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              "&:hover": { cursor: "pointer" },
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
			  fontSize: "35px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PETPALS
          </Typography>
          {/* Hamburger button display if logged in */}
          {auth.loggedIn() ? (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link
                    key={page}
                    to={`/${page}`}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          ) : (
            <></>
          )}
          {/* PETPALS logo */}
          <PetsIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              "&:hover": { cursor: "pointer" },
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
			  fontSize: "30px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PETPALS
          </Typography>
          {/* Navigation and Logout button display if logged in */}
          {auth.loggedIn() ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Link
                    key={page}
                    to={`/${page}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        transition: ".5s",
						fontWeight: "bolder",
						fontSize: "20px",
                        "&:hover": { color: "gainsboro", fontWeight: "bolder" },
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))}
              </Box>
              <LogoutForm />
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
