import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";


function App() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <ImageList sx={{ width: "65%", overflow: 'hidden'}} cols={3}>
        <ImageListItem key="Subheader" cols={3} sx={{ height: "90%" }}>
          <ListSubheader
            component="div"
            sx={{ textAlign:"center", color: "black", fontSize: "32px", margin: "1em", padding: ".5em", fontWeight: 600 }}
          >
            Your Pets
          </ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{ maxHeight: "245px", maxWidth: "245px"  }}>
            <img
              src={`${item.img}`}
              srcSet={`${item.img}`}
              alt={item.title}
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                ></IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "https://i.pinimg.com/564x/a1/e8/ed/a1e8ed60a5b6d47d880c2009da85b6f2.jpg",
    title: "brgr",
    author: "@brgrcat",
  },
  {
    img: "https://i.pinimg.com/564x/6e/0b/fe/6e0bfee62d1c837e9c2531c8110f473c.jpg",
    title: "pedals",
    author: "@pedaldealer",
  },
  {
    img: "https://i.pinimg.com/564x/09/62/88/096288caa9981ea6ce7d9d197a64153f.jpg",
    title: "skat",
    author: "@skatecat",
  },
  {
    img: "https://i.pinimg.com/564x/d5/7b/0d/d57b0d640c784655c100c4cf08d1ae1c.jpg",
    title: "pretty",
    author: "@prettycat",
  },
  {
    img: "https://i.pinimg.com/564x/96/3f/83/963f83bd9c858d2789325a3ce14d68c7.jpg",
    title: "headphones",
    author: "@hphcat",
  },
  {
    img: "https://i.pinimg.com/564x/3a/82/89/3a82895a4af0593f13adc0e5bd3175cb.jpg",
    title: "angry",
    author: "RAGHHG",
  },
  {
    img: "https://i.pinimg.com/564x/b6/32/49/b632493e3881a785c2320fcb8f123771.jpg",
    title: "dizy",
    author: "@dizzycat",
  },
  {
    img: "https://i.pinimg.com/564x/9a/d7/e8/9ad7e88916828fc3cfe600aeb4361c87.jpg",
    title: "AHHHHHGGHHFIOUHAWIUFG",
    author: "@funcat",
  },
  {
    img: "https://i.pinimg.com/736x/63/42/a2/6342a2853209e45d2f238b60ae5d718a.jpg",
    title: "eeat",
    author: "@nopmonomononnom",
  },
//   {
//     img: "https://i.pinimg.com/564x/46/41/4d/46414dac1d6fa50edb4463a9136f6a3a.jpg",
//     title: "NAOOOOORURRR",
//     author: "@stuk",
//   },
];

export default App;
