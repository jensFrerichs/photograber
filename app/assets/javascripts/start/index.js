// https://github.com/woocommerce/FlexSlider/wiki/FlexSlider-Properties


$(document).ready(function(){
    let button = $('#trigger');
    let paths = [];
    let infoBox = $('#info');
    let startText = $('#info').text();


function updatePaths () {
    $('img').each(function(){ paths.push($(this).attr('src')) });
}


// --- img slider ---
    updatePaths();

    $('#flexslider').flexslider({
        before: function(){
            infoBox.text('Suche nach neuen Bildern ...')
        },
        after: function(){
            $.post( "/fetch", { data: paths }, function(data){
                console.log(data);
                if(data.length >= 1){
                    infoBox.text(`${data.length} ${data.length > 1 ? "Fotos" : "Foto"} gefunden!`);
                    data.forEach(function(url){
                        let li = "<li>" + url + "</li>";
                        $('#flexslider').data('flexslider').addSlide($(li));
                    });
                    updatePaths();
                } else {
                    infoBox.text('Keine neuen Bildern gefunden - Nimm doch eins auf!')
                }
            })
        }
    });
    $('#flexslider').start();

// --- img slider ---
// --- fetch files logic ---
    /*
    button.on('click', function(){
        $.post( "/fetch", { data: paths }, function(data){
            console.log(data);
            if(data.length >= 1){
                data.forEach(function(url){
                    let li = "<li>" + url + "</li>";
                    $('#flexslider').data('flexslider').addSlide($(li));
                });
                updatePaths();
            }
        })
    });
    */
// --- fetch files logic ---
});


