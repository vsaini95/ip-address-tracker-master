var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
var circle = L.circle([51.508, -0.11], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);

const detailsdiv = document.querySelector(".details");

const ipHandler = function (ip) {
  fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_MhI9eO2ZfK6xSWGY7ozkt0qY4sPSk&ipAddress=${ip}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
    });
  inputip.value = "";
};

const btn = document.querySelector(".form_btn");
const inputip = document.querySelector(".form-input");
btn.addEventListener("click", function (e) {
  e.preventDefault();
  let ip = inputip.value;
  ipHandler(ip);
});
