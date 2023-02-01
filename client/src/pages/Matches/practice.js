function findLatLon(city) {
  let latLon = { lat: "", lon: "" };
  const geoAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=1560a07c19638ebfb003c32577cdfee1`;
  fetch(geoAPI)
    .then((response) => response.json())
    .then((data) => {
      latLon.lat = data[0].lat;
      latLon.lon = data[0].lon;
      console.log(latLon);
      return latLon;
    });
}

async function distanceCalc(userLocation, otherLocation) {
  let location1 = userLocation.toLowerCase();
  location1 = location1.replace(" ", "_");
  console.log(location1);
  let location2 = otherLocation.toLowerCase();
  location2 = location2.replace(" ", "_");
  console.log(location2);
  const userLatLon = await findLatLon(location1);
  console.log(userLatLon);
  // const otherLatLon = findLatLon(location2);
  // console.log(otherLatLon);
  // const userLat = userLatLon.lat;
  // const userLon = userLatLon.lon;
  // const otherLat = otherLatLon.lat;
  // const otherLon = otherLatLon.lon;
  // let distance = getDistance(
  //   { latitude: userLat, longitude: userLon },
  //   { latitude: otherLat, longitude: otherLon }
  // );
  // distance = distance / 1609;
  // console.log(distance);
}

// findLatLon("fountain_valley");

distanceCalc("Fountain Valley", "Irvine");
