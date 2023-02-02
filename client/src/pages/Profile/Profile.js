import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Profile.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1200px",
  height: "1200px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <section className="page">
      <div id="pets-header">
        <h1>Your Pets</h1>
      </div>
      <div className="pets-section">
        <div className="pets-container">
          <ul>
            <li>
              <div>
                <Button
                  onClick={handleOpen}
                  sx={{
                    padding: "32em 32em 0 0",
                    margin: "8em",
                    display: "flex",
                    alignItems: "flex-end",
                    textDecoration: "none",
                    backgroundSize: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.484)",
                    backgroundBlendMode: "soft-light",
                    transitionDuration: "1s",
                    backgroundImage:
                      'url("https://i.pinimg.com/564x/a5/e3/d7/a5e3d756ae332a8ca01f3ad7c0c54aa8.jpg")',
                    "&:hover": {
                      transition: "1s",
                      backgroundColor: "rgba(0,0,0,0)",
                    },
                  }}
                >
                  <div className="text-background">
                    <h3>Kuro</h3>
                  </div>
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  className="modal"
                >
                  <Box sx={style}>
                    <div className="modal-body">
                      <div className="profile-posts-center">
                        <div className="profile-posts">
                          <img src="https://i.pinimg.com/564x/a9/dd/d5/a9ddd5dcd620e17c3f2932e272837ca7.jpg"></img>
                        </div>
                        <div className="profile-posts">
                          <img src="https://i.pinimg.com/564x/da/e0/3b/dae03bf3e58a5fa50ace50b6e9d88ca9.jpg"></img>
                        </div>
                        <div className="profile-posts">
                          <img src="https://i.pinimg.com/564x/d5/7b/0d/d57b0d640c784655c100c4cf08d1ae1c.jpg"></img>
                        </div>
                        <div className="profile-posts">
                          <img src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg"></img>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <img src="https://i.pinimg.com/564x/a5/e3/d7/a5e3d756ae332a8ca01f3ad7c0c54aa8.jpg"></img>
                      <h1>Kuro</h1>
                    </div>
                  </Box>
                </Modal>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}