function getPosition() {
    try {
        if (navigator.geolocation != null) {
            // high accuracy
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            function onSuccess(position) {
                var coordinates = position.coords;
                var lat = coordinates.latitude;
                var lng = coordinates.longitude;
                var alt = coordinates.altitude;

                var type = google.maps.MapTypeId.ROADMAP;
                if ($("#radRoad").prop("checked")) {
                    type = google.maps.MapTypeId.ROADMAP;
                }
                else if ($("#radSatellite").prop("checked")) {
                    type = google.maps.MapTypeId.SATELLITE;
                }
                else if ($("#radHybrid").prop("checked")) {
                    type = google.maps.MapTypeId.HYBRID;
                }
                else if ($("#radTerrain").prop("checked")) {
                    type = google.maps.MapTypeId.TERRAIN;
                }


                function showPosition() {
                    console.info("latitude: " + lat);
                    console.info("longitude: " + lng);
                    console.info("altitude: " + alt);
                }

                function showPositionOnMap() {
                    var latlng = lat + "," + lng;
                    var zoom = 14;

                    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlng +
                        "&zoom=" + zoom + "&size=1400x1300&sensor=false";

                    $("#mapHolder").prop("src", img_url);

                }

                function showPositionOnMapWithMarker() {
                    var pos = {
                        lat: lat,
                        lng: lng
                    };

                    var options = {
                        zoom: 14,
                        center: pos,
                        mapTypeId: type
                    };

                    var map = new google.maps.Map(document.getElementById('map-canvas'), options);
                    var marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        title: "Current location"

                    });

                }

                showPosition();
                showPositionOnMap();
                showPositionOnMapWithMarker();

                //var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                //    lat + "," + lng + "&sensor=true";
                //var location = "";
                //
                //$.getJSON(url, function (data) {
                //    var locationAccurate = data.results[0].formatted_address;
                //    var locationDistrict = data.results[1].formatted_address;
                //    var date = new Date();
                //    var options = [locationAccurate, locationDistrict, date];
                //    tblMap.insert(options);
                //});

            }

            function onFail(error) {
                var msg = "";
                try {
                    if (error) {
                        switch (error.code) {
                            case error.TIMEOUT:
                                msg = "TIMEOUT: " + error.message;
                                break;
                            case error.PERMISSION_DENIED:
                                msg = "PERMISSION_DENIED: " + error.message;
                                break;
                            case error.POSITION_UNAVAILABLE:
                                msg = "POSITION_UNAVAILABLE: " + error.message;
                                break;
                            default:
                                msg = "UNHANDLED MESSAGE ERROR CODE: (" + error.code + "): " + error.message;
                                break;
                        }
                        console.error(msg);

                    }

                } catch (e) {
                    console.error("Exception in onFail(): " + e);

                }


            }

            navigator.geolocation.getCurrentPosition(onSuccess, onFail, options);
        }
        else {
            console.error("HTML5 geolocation is not supported.");
        }
    } catch (e) {
        console.error("Exception in getPosition(): " + e);
    }
}

function recordPosition() {
    try {
        if (navigator.geolocation != null) {
            // high accuracy
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            function onSuccess(position) {
                var coordinates = position.coords;
                var lat = coordinates.latitude;
                var lng = coordinates.longitude;

                var url = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
                    lat + "," + lng + "&sensor=true";

                $.getJSON(url, function (data) {
                    var locationAccurate = data.results[0].formatted_address;
                    var locationDistrict = data.results[1].formatted_address;
                    var date = new Date();
                    var options = [locationAccurate, locationDistrict, date];
                    tblMap.insert(options);
                });
            }

            function onFail(error) {
                var msg = "";
                try {
                    if (error) {
                        switch (error.code) {
                            case error.TIMEOUT:
                                msg = "TIMEOUT: " + error.message;
                                break;
                            case error.PERMISSION_DENIED:
                                msg = "PERMISSION_DENIED: " + error.message;
                                break;
                            case error.POSITION_UNAVAILABLE:
                                msg = "POSITION_UNAVAILABLE: " + error.message;
                                break;
                            default:
                                msg = "UNHANDLED MESSAGE ERROR CODE: (" + error.code + "): " + error.message;
                                break;
                        }
                        console.error(msg);

                    }

                } catch (e) {
                    console.error("Exception in onFail(): " + e);

                }


            }

            navigator.geolocation.getCurrentPosition(onSuccess, onFail, options);
        }
        else {
            console.error("HTML5 geolocation is not supported.");
        }
    } catch (e) {
        console.error("Exception in getPosition(): " + e);
    }
}

