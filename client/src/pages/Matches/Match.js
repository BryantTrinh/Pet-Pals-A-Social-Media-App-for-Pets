import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import { getDistance } from "geolib";

function Match() {
  const { loading, data } = useQuery(QUERY_USER);
  const userLocation = data?.location || "";
  if (userLocation === "") {
    return "Invalid location";
  }
  const otherLocation = data?.location || "";
  if (otherLocation === "") {
    return "Location error";
  }
  let location1 = userLocation.toLowerCase();
  location1 = location1.replace(" ", "_");
  let location2 = otherLocation.toLowerCase();
  location2 = location2.replace(" ", "_");
  const userLatLon = findLatLon(location1);
  const otherLatLon = findLatLon(location2);
  const userLat = userLatLon.lat;
  const userLon = userLatLon.lon;
  const otherLat = otherLatLon.lat;
  const otherLon = otherLatLon.lon;
  let distance = getDistance(
    { latitude: userLat, longitude: userLon },
    { latitude: otherLat, longitude: otherLon }
  );
  distance = distance / 1609;
}

function findLatLon(city) {
  let latLon = { lat: "", lon: "" };
  const geoAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=1560a07c19638ebfb003c32577cdfee1`;
  fetch(geoAPI)
    .then((response) => response.json())
    .then((data) => {
      latLon.lat = data[0].lat;
      latLon.lon = data[0].lon;
      return latLon;
    });
}

export default Match;
