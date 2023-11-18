import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_OWNER } from "../../utils/queries";
import { getDistance } from "geolib";
import auth from "../../utils/auth.js";
import Typography from "@mui/material/Typography";
import { useState } from "react";

async function findLatLon(city) {
	let latLon = { lat: "", lon: "" };
	const geoAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=1560a07c19638ebfb003c32577cdfee1`;
	let response = await fetch(geoAPI);
	let data = await response.json();
	latLon.lat = data[0].lat;
	latLon.lon = data[0].lon;
	return latLon;
}

async function distanceCalc(userLocation, otherLocation) {
	let location1 = userLocation.toLowerCase();
	location1 = location1.replace(" ", "_");
	let location2 = otherLocation.toLowerCase();
	location2 = location2.replace(" ", "_");
	const userLatLon = await findLatLon(location1);
	const otherLatLon = await findLatLon(location2);
	const userLat = userLatLon.lat;
	const userLon = userLatLon.lon;
	const otherLat = otherLatLon.lat;
	const otherLon = otherLatLon.lon;
	let distance = getDistance(
		{ latitude: userLat, longitude: userLon },
		{ latitude: otherLat, longitude: otherLon }
	);
	distance = distance / 1609;
	const finalDistance = Math.round(distance);
	return finalDistance;
}

function Match(props) {
  const [distance, setDistance] = useState(0);
  // const { loading: ownerLoading, data: ownerData } = useQuery(QUERY_OWNER, {
  //   variables: { ownerId: props.pet.owner },
  // });
  // const owner = ownerData?.owner || {};
  const ownerLocation = props.pet.owner.location;
  const userLocation = props.userData.user.location;
  function calculateDistance() {
    distanceCalc(ownerLocation, userLocation).then((res) => {
      setDistance(res);
    });
  }
  return (
    // <>
    //   {ownerLoading ? (
    //     <div>Loading...</div>
    //   ) : (
        <>
          {calculateDistance()}
          <Typography variant="body2" color="text.secondary">
            Owner: {props.pet.owner.first_name} {props.pet.owner.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {distance} Miles Away
          </Typography>
        </>
      // )}
    // </>
  );
}

// findLatLon("fountain_valley");

export default Match;