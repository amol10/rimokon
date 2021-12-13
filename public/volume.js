
function get_volume() {
    /*jQuery.ajax('http://localhost:3000/volume/get/', (res) => {
        console.log(res);
    });*/
    $.ajax({
        url: 'http://localhost:3000/volume/get/',
        success: (data) => {
            console.log(data);
            var j = $.parseJSON(data);
            update_sliders(j.)
        }
    });
}

function update_sliders(alsa, bluetooth) {
    jQuery('#alsa').prop('value', alsa);
    jQuery('#bluetooth').prop('value', bluetooth);
}
