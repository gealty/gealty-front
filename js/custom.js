var url = '';
var zoom = 5;
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
        console.log('water');
    });
    $("#geo").click(function () {
        console.log('geo');
    });
    $( "#selectYear" ).change(function() {
        var temp = $(this).val();
        console.log('year: ' + temp);
    });
    $( "#stamen" ).change(function() {
        var temp = $(this).val();
        var layer = new L.StamenTileLayer(temp);
        map.addLayer(layer);
        console.log('stamen: ' + temp);
    });
});

function initMap() {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy;' +
        ' <a href="http://osm.org/copyright" target="_blank" title="OpenStreetMap">OpenStreetMap</a>' +
        '| <a href="https://github.com/gealty" target="_blank" title="Gealty Team">Gealty Team</a>'
    }).addTo(map);

    //onMapDrag();
    //onZoomEnd();
    rainLayer();
    onClick();
}

function onMapDrag() {
    map.on('dragend', function (event) {
        var center = map.getCenter();
        geo['lat'] = center.lat;
        geo['lng'] = center.lng;

        console.log('dragEnd: ' + center);
    });
};

function onZoomEnd() {
    map.on('zoomend', function (event) {
        console.log('zoom');
    });
}

function onClick() {
    map.on('click', function(e) {
        geo['lat'] = e.latlng.lat;
        geo['lng'] = e.latlng.lng;

        $('#lat_hidden').val(geo['lat']);
        $('#lng_hidden').val(geo['lng']);
        getData();
    });
}

function rainLayer(){
    var diasMeses = [
        31,
        28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ]

    var today = new Date();
    var mm = today.getMonth();

    var mes = 0;
    if(mm == 01){
        mes = diasMeses[0];

    }else if(mm == 02){
        mes = diasMeses[1];

    }else if(mm == 03){
        mes = diasMeses[2];

    }else if(mm == 04){
        mes = diasMeses[3];

    }else if(mm == 05){
        mes = diasMeses[4];

    }else if(mm == 06){
        mes = diasMeses[5];

    }else if(mm == 07){
        mes = diasMeses[6];

    }else if(mm == 08){
        mes = diasMeses[7];

    }else if(mm == 09){
        mes = diasMeses[8];

    }else if(mm == 10){
        mes = diasMeses[9];

    }else if(mm == 11){
        mes = diasMeses[10];

    }else if(mm == 12){
        mes = diasMeses[11];

    }

    var array = []
    var baseLayers = {};
    for(var i = 0; i < mes; i++){
        $('select#date').val();
        var today = new Date();
        var dd = today.getDate()+ i;
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear() -2;

        if(dd > 31){
            dd = 1 + i -2;
        }else{
            mm= 3;
        }
        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = yyyy + '-'  + mm + '-' + dd;

        array.push(L.tileLayer('https://gibs-a.earthdata.nasa.gov/wmts/epsg4326/best/wmts.cgi?TIME=' + today + '&layer=GMI_Rain_Rate_Asc&style=default&tilematrixset=2km&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={y}&TileRow={x}', {
            crossOrigin: 'Anonymous',
            attribution: 'NASA',
        }));
        baseLayers[today] = array[i];
    }

    L.control.layers(baseLayers).addTo(map);
}

$('#activeModal').on('contextmenu', function() {
    $('#myModal').modal('show');
    return false;
});

/* Ajax function  */

function getData() {
    var url = 'http://10.10.11.64:8080/GealtyServer/services/CheckPlace';
    var data = JSON.stringify(geo);
    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        beforeSend: function () {
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
            };
            xhr.upload.onload = function () {

            };
            return xhr;
        }
    });
}

function sendSeedAndSearch(save){
    var lat = $('#lat_hidden').val();
    var long =  $('#lng_hidden').val();
    var url = 'http://10.10.11.64:8080/GealtyServer/services/CheckPlace';

    var geo = {
        "lat": lat,
        "lng": long,
        "seed": $('#search').val(),
        "save": save,
    }

    $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        beforeSend: function () {
        },
        success: function (data, textStatus, jqXHR) {;
            if (data == "OK") {
                $('#sendSeed').prop( "disabled", false );
            }else{
                $('#sendSeed').prop( "disabled", true );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        xhr: function () {
            var xhr = $.ajaxSettings.xhr();
            xhr.upload.onprogress = function (evt) {
                var percent = parseInt(evt.loaded / evt.total * 100);
            };
            xhr.upload.onload = function () {

            };
            return xhr;
        }
    });
}