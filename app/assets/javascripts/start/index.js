$(document).ready(function(){
    let paths = [];
    let infoBox = $('#info');
function updatePaths () {
    $('img').each(function(){ paths.push($(this).attr('src')) });
}

// --- img slider ---
    // https://github.com/woocommerce/FlexSlider/wiki/FlexSlider-Properties
    updatePaths();
    $('#flexslider').flexslider({
        before: function(){
            infoBox.text('Suche nach neuen Bildern ...')
        },
        after: function(){
            $.post( "/fetch", { data: paths }, function(data){
                console.log(data);
                if(data.length >= 1){
                    data.forEach(function(url){
                        let li = "<li>" + url + "</li>";
                        $('#flexslider').data('flexslider').addSlide($(li));
                    });

                    let lastIndex = $('#flexslider').data('flexslider').slides.length - 1;
                    $('#flexslider').flexslider(lastIndex);
                    setTimeout(function(){
                        infoBox.text(`${data.length} ${data.length > 1 ? "neue Fotos" : "neues Foto"} gefunden!`);
                        $('#flexslider').flexslider("play");
                    }, 2000);
                    updatePaths();
                } else {
                    infoBox.text('Keine neuen Bildern gefunden - Nimm doch eins auf!')
                }
            })
        }
    });
// --- img slider ---
});


