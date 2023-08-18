"use strict";

const btn = document.querySelector(".form_btn");
const inputip = document.querySelector(".form-input");
const isp = document.querySelector(".isp");
const timezone = document.querySelector(".timez");
const loc = document.querySelector(".location");
const ipadd = document.querySelector(".ip");

let map;
//setting map and tiles
const showMap = function (coords) {
  map = L.map("map").setView(coords, 10);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  const marker = L.marker(coords).addTo(map);
  marker.bindPopup(`<b>you are in</b>`).openPopup();

  var popup = L.popup();
  map.on("click", function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  });
};

navigator.geolocation.getCurrentPosition(
  function (pos) {
    const { longitude } = pos.coords;
    const { latitude } = pos.coords;
    const coords = [latitude, longitude];
    showMap(coords);
  },
  function () {
    alert("could not access your location");
  }
);

const ipHandler = function (ip) {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_MhI9eO2ZfK6xSWGY7ozkt0qY4sPSk&ipAddress=${ip}`
  )
    .then((res) => {
      if (!res.ok) {
        alert("Please enter the correct IP deatils!");
        return;
      }
      return res.json();
    })
    .then((data) => {
      //console.log(data);
      ipadd.textContent = `${data.ip}`;
      timezone.textContent = `${data.location.timezone}`;
      loc.textContent = `${data.location.country}, ${data.location.region}`;
      isp.textContent = `${data.isp}`;
      showMap([data.location.lat, data.location.lng]);
    })
    .catch((err) => alert(err));
  inputip.value = "";
};

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let ip = inputip.value;
  ipHandler(ip);
});
