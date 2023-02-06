import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./Profile.css";
import { QUERY_MYPETS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import PetProfile from "../PetProfile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "350px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 2.5,
  pb: 3,
  borderRadius: "2em",
};

// should display on page below using <PetProfiles /> ?
const petProfiles = (props) => (
  <>
    <div className="modal-body">
      <div className="flex-body">
        {/* profile picture SAME ON MODAL BUTTON BELOW*/}
        <div className="profile-posts-picture">
          <img src=""></img>
        </div>
        {/* contents to fetch to? */}
        <div className="profile-posts-center">
          <h1>{props.pet.name}</h1>
          <h4>species: {props.pet.species}</h4>
          <h4>birthday: {props.pet.birthday}</h4>
        </div>
      </div>
    </div>
  </>
);

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, data } = useQuery(QUERY_MYPETS);
  console.log(data);
  const petList = data?.myPets || [];
  return (
    <section className="page">
      <div id="pets-header">
        <h1>Your Pets</h1>
      </div>
      <div className="pets-section">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {petList.map((pet) => {
              return (
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
                            // profile picture SAME IN FUNC OBJ unsure how to display here :(
                            backgroundImage: `${pet.picturesURL}`,
                            "&:hover": {
                              transition: "1s",
                              backgroundColor: "rgba(0,0,0,0)",
                            },
                          }}
                        >
                          <div className="text-background">
                            <h3>{pet.name}</h3>
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
                            <PetProfile pet={pet} />
                          </Box>
                        </Modal>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </>
        )}
      </div>
    </section>
  );
}
