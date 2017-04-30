/**
 * Global vars
 */
var url = '';
var zoom = 6;
var geo = {
    'lat': 40.415363,
    'lng': -3.707398
};
var map = L.map('map').setView([geo['lat'], geo['lng']], zoom);

$(document).ready(function () {
    initMap();

    $("#help").click(function () {
        console.log('help');
    });
    $("#water").click(function () {
        getPrecipitation();
        console.log('water');
    });
    $("#geo").click(function () {
        console.log('geo');
    });
    $( "#selectYear" ).change(function() {
        var temp = $(this).val();
        console.log('year: ' + temp)
    });
});

function initMap() {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy;' +
        ' <a href="http://osm.org/copyright" target="_blank" title="OpenStreetMap">OpenStreetMap</a>' +
        '| <a href="https://github.com/gealty" target="_blank" title="Gealty Team">Gealty Team</a>'
    }).addTo(map);

    var layer = new L.StamenTileLayer("terrain");
    map.addLayer(layer);

    // L.tileLayer('https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_CityLights_2012/default/2012-07-09/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg', {
    //     crossOrigin: 'Anonymous',
    //     attribution: 'NASA',
    // }).addTo(map);

    //onMapDrag();
    //onZoomEnd();
}

function onMapDrag() {
    map.on('dragend', function (event) {
        var center = map.getCenter();
        geo['lat'] = center.lat;
        geo['lng'] = center.lng;

        console.log('getCenter: ' + center);
    });
};

function onZoomEnd() {
    map.on('zoomend', function (event) {
        console.log('zoom');
    });
}

function getPrecipitation() {
    L.tileLayer('https://gibs-c.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=2015-01-01&layer=GMI_Snow_Rate_Dsc&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={y}&TileRow={x}', {
        crossOrigin: 'Anonymous',
        attribution: 'NASA',
    }).addTo(map);
}

function getData(object, filter) {
    var seed = '';
    var uniqueKey = '';

    $.ajax({
        type: 'post',
        url: $(this).attr('action'),
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        beforeSend: function () {
            console.log('init');
        },
        success: function (data, textStatus, jqXHR) {
            var result = data['data'];
            if (result == 1) {
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.upload.onprogress = function (evt) {
                var percent = parseInt(evt.loaded / evt.total * 100);
                console.log(percent);
            };
            xhr.upload.onload = function () {
                console.log('100%');
            };
            return xhr;
        }
    });
}