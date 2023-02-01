const { getDistance } = require("geolib");

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
  console.log(location1);
  let location2 = otherLocation.toLowerCase();
  location2 = location2.replace(" ", "_");
  console.log(location2);
  const userLatLon = await findLatLon(location1);
  console.log("distance calc", userLatLon);
  const otherLatLon = await findLatLon(location2);
  console.log(otherLatLon);
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
}

distanceCalc("Fountain Valley", "Irvine");
