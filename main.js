const CRIMES = "https://data.cityofnewyork.us/resource/9s4h-37hy.json";
const NEIGHNAMES = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
const GEOSHAPES = "http://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
const HOUSING = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";


function onGoogleMapResponse(){
	map = new google.maps.Map(document.getElementById('googleMapContainer'), {
		zoom: 16
	});

	var location = "NYU Stern School of Business";
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address' : location}, function(results, status){
		if(status == google.maps.GeocoderStatus.OK){
			map.setCenter(results[0].geometry.location);
		};
		map.data.loadGeoJson(GEOSHAPES)
		map.data.setStyle(function(feature){
		    
		})
	});
}

function markerss (){
	var myLatlng = new google.maps.LatLng(40.7291,-73.9965);
	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"Hello World!"
	});

	marker.setMap(map);
}

function getCrimes(){
  $.ajax({
      url: CRIMES+'?cmplnt_fr_dt=2016-12-31T00:00:00.000',
      type: "GET",
      data: {
        "$limit" : 5000,
      }
  }).done(function(data) {
    nyCrimes = data;
  })
  .fail(function(error){
    console.log(error);
  })
}

function getHousing(){
  var data = $.get(URL_HOUSING,function(){})
  .done(function(){
    nyHousing = data.responseJSON.data;
  })
  .fail(function(error){
    console.log(error);
  })
}

$(document).ready( function(){
	$("#Markers").on("click", markerss);
})
