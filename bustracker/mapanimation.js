mapboxgl.accessToken = 'pk.eyJ1Ijoicmlza29ubmVjdCIsImEiOiJjazZlZDJxcTYwZm03M25tdmFpajU0MGl2In0.XdmSVvdfIFmyFNnohfP4dQ';

//Define the map container
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-71.104081, 42.365554],
  zoom: 13
});

//Create marker for starting location
var marker = new mapboxgl.Marker({ color: "red"})
.setLngLat([-71.092761, 42.357575])
.addTo(map);

//Define array for busstops
const busStops = [
  [-71.095800, 42.36098],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.118625, 42.374863]
]

//Initialise counter to run through the stops
var counter = 0;

//Function put a green marker at intermediate stops and red marker at the last stop 
function move() {
  setTimeout(()=>{
    var newMarker;
    if ( counter >= busStops.length) return ;
    if ( counter === busStops.length-1) {
      newMarker = new mapboxgl.Marker({color: "red"})
      .setLngLat(busStops[counter])
      .addTo(map);
    }
    else {
      newMarker = new mapboxgl.Marker({color: "green"})
      .setLngLat(busStops[counter])
      .addTo(map);
  }
    counter++;
    move();
  }, 1000);
}