/**
 * Global vars
 */
var url = '';
var geo = {
    'lat':'41.6563497',
    'long':'-0.8765662'
};
var map = L.map('map').setView([41.6563497,  -0.8765662], 3);

$(document).ready( function () {
    initMap();
});

function initMap() {
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([geo['lat'], geo['long']]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();

    onMapDrag();
}

function onMapDrag() {
    map.on('dragend', function(event){
        console.log(map.getCenter());
    });
};

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
            if (result == 1){
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
        },
        xhr: function(){
            var xhr = $.ajaxSettings.xhr();
            xhr.upload.onprogress = function(evt){
                var percent = parseInt(evt.loaded / evt.total * 100);
                console.log(percent);
            };
            xhr.upload.onload = function(){
                console.log('100%');
            };
            return xhr;
        }
    });
}