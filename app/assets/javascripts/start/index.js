// https://github.com/woocommerce/FlexSlider/wiki/FlexSlider-Properties


$(document).ready(function(){
    let button = $('#trigger');
    let paths = [];
// --- img slider ---

    $('#flexslider').flexslider();

// --- img slider ---
function updatePaths () {
    $('img').each(function(){ paths.push($(this).attr('src')) });
}


// --- fetch files logic ---
    updatePaths();
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
// --- fetch files logic ---
});


