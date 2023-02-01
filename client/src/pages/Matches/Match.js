import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { getDistance } from "geolib";
import auth from "../../utils/auth.js";

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
  return finalDistance
}

function Match() {
  const user = auth.getProfile();
  
  console.log(user);
}

// findLatLon("fountain_valley");

distanceCalc("Fountain Valley", "Irvine");
Match();

export default Match;
