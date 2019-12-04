// https://github.com/woocommerce/FlexSlider/wiki/FlexSlider-Properties


$(document).ready(function(){
// --- img slider ---

    $('.flexslider').flexslider();

// --- img slider ---

// --- fetch files logic ---
    let target = $('#slides');
    let button = $('#trigger');
    let paths = [];
    function updatePaths () {
        $('img').each(function(){ paths.push($(this).attr('src')) });
    }
    updatePaths();
    button.on('click', function(){
        $.post( "/fetch", { data: paths }, function(data){
            console.log(data);
            if(data.length >= 1){
                data.forEach(function(url){
                    $('.flexslider').data('flexslider').addSlide(url);
                });
                updatePaths();
            }
        })
    });
// --- fetch files logic ---
});


