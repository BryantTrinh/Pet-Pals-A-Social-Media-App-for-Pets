import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./Profile.css";
import { QUERY_MYPETS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import PetProfile from "../PetProfile";
import { Grid } from "@mui/material";

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
  borderRadius: ".5em",
};

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { loading, data } = useQuery(QUERY_MYPETS);
  const petList = data?.myPets || [];
  console.log(petList);
  return (
    <Grid item xs={12} sm={6} md={3}>
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
                  <div className="pets-container" key={pet._id}>
                    <ul>
                      <li>
                        <div>
                          <Button
                            // item
                            xs={12}
                            sm={8}
                            md={5}
                            onClick={handleOpen}
                            id="modal-button"
                            sx={{
                              display: "block",
                              margin: "0 auto",
                              border: "3px solid black",
                              padding: "20em",
                              marginBottom: "5em",
                              textDecoration: "none",
                              backgroundSize: "100%",
                              backgroundColor: "rgba(0,0,0,0.12)",
                              backgroundBlendMode: "soft-light",
                              transitionDuration: ".5s",
                              // profile picture SAME IN FUNC OBJ unsure how to display here :(
                              backgroundImage: `url(${pet.picturesURL})`,
                              "&:hover": {
                                transition: "1s",
                                backgroundColor: "rgba(0,0,0,0.484)",
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
    </Grid>
  );
}