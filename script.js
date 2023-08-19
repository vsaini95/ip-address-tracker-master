"use strict";

const btn = document.querySelector(".form_btn");
const inputip = document.querySelector(".form-input");
const isp = document.querySelector(".isp");
const timezone = document.querySelector(".timez");
const loc = document.querySelector(".location");
const ipadd = document.querySelector(".ip");

//setting map and tiles
let map;
let coords = [51.505, -0.09];

const showMap = function (coords) {
  if (map) {
    map.off();
    map.remove();
  }
  map = L.map("map").setView(coords, 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  var myIcon = L.icon({
    iconUrl: "images/icon-location.svg",
    iconSize: [38, 50],
    iconAnchor: [22, 85],
    popupAnchor: [-3, -76],
  });
  const marker = L.marker(coords, { icon: myIcon }).addTo(map);
  marker.bindPopup(`you are in entered location`).openPopup();

  var popup = L.popup();
  map.on("click", function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
  });
  inputip.value = "";
};
showMap(coords);

const ipHandler = function (ip) {
  if (ip) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_MhI9eO2ZfK6xSWGY7ozkt0qY4sPSk&ipAddress=${ip}`
    )
      .then((res) => {
        if (!res.ok) {
          inputip.value = "";
          alert("Please enter the correct IP deatils!");
          return;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        ipadd.textContent = `${data.ip}`;
        timezone.textContent = `${data.location.timezone}`;
        loc.textContent = `${data.location.country}, ${data.location.region}`;
        isp.textContent = `${data.isp}`;
        showMap([data.location.lat, data.location.lng]);
      })
      .catch((err) => {
        throw new Error(err);
      });
      .catch((err) => alert(err));
  }
};

btn.addEventListener("click", function (e) {
  e.preventDefault();
  let ip = inputip.value;
  ipHandler(ip);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") ipHandler(inputip.value);
});
