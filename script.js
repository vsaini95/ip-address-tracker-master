const detailsdiv = document.querySelector(".details");

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
      console.log(data);
      mapd(
        data.location.lat,
        data.location.lng,
        data.location.country,
        data.location.city
      );
      detailsdiv.innerHTML = `<div class="ip">
      <p class="details-p">IP ADDRESS</p>
      <h1>${data.ip}</h1>
    </div>
    <div class="location">
      <p class="details-p">LOCATION</p>
      <h1>${data.location.country}, ${data.location.region}</h1>
    </div>
    <div class="timez">
      <p class="details-p">TIMEZONE</p>
      <h1>UTC ${data.location.timezone}</h1>
    </div>
    <div class="isp">
      <p class="details-p">ISP</p>
      <h1>${data.isp}</h1>
    </div>`;
    })
    .catch((err) => console.error(err));
  inputip.value = "";
};

const btn = document.querySelector(".form_btn");
const inputip = document.querySelector(".form-input");
btn.addEventListener("click", function (e) {
  e.preventDefault();
  let ip = inputip.value;
  ipHandler(ip);
});

var map;
const mp = document.getElementById("map");
var popup;
var mapd = function (lat, lon, count, cit) {
  map = L.map("map").setView([lat, lon], 13);
  console.log(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);
  var marker = L.marker([lat, lon]).addTo(map);
  marker.bindPopup(`<b>you are in</b><br>${cit}, ${count}`).openPopup();
  popup = L.popup();
};
function onMapClick(e) {
  console.log(e);
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}
mp.addEventListener("click", onMapClick);
