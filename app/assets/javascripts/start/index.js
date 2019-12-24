$(document).ready(function(){
    let paths = [];
    let infoBox = $('#info');
    let slider = $('#flexslider');
    let gridButton = $('#gridBtn');
    let grid = false;

    gridButton.on('click', function(){
        if(grid) {
            $('#grid').css('display', 'none');
            grid = false;
        } else {
            $('#grid').css('display', 'inline-flex');
            grid = true;
        }
    });

    function updatePaths () {
        $('.slide_image').each(function(){ paths.push($(this).attr('src')) });
    }

// --- img slider ---
    // https://github.com/woocommerce/FlexSlider/wiki/FlexSlider-Properties
    updatePaths();
    slider.flexslider({
        before: function(){
            infoBox.text('Suche nach neuen Bildern ...')
        },
        after: function(){
            $.post( "/fetch", { data: paths }, function(data){
                console.log(data);
                if(data.length >= 1){
                    data.forEach(function(url){
                        let li = "<li>" + "<img src='" + url + "' class='slide_image' \>" + "</li>";
                        slider.data('flexslider').addSlide($(li));
                        // append also to grid
                        let i = slider.data('flexslider').slides.length - 1;
                        let gridImage = '<div class="col-md-4 p-4">' + '<img src="' + url + '" alt="' + i + '" class="grid_image"\></div>';
                            console.log(gridImage);
                        $('#grid').append(gridImage);
                        assignEvents();
                    });

                    let lastIndex = slider.data('flexslider').slides.length - 1;
                    slider.flexslider(lastIndex);
                    slider.flexslider("pause");
                    infoBox.text(`${data.length} ${data.length > 1 ? "neue Fotos" : "neues Foto"} gefunden!`);
                    setTimeout(function(){
                        slider.flexslider("play");
                    }, 6000);
                    updatePaths();
                } else {
                    infoBox.text('Keine neuen Bildern gefunden - Nimm doch eins auf!')
                }
            })
        }
    });
    function changeSlideTo(index) {
        slider.flexslider(index)
    }
    function assignEvents(){
        $('.grid_image').click(function(){
            let index = parseInt($(this).attr('alt'));
            changeSlideTo(index);
        });
    }
    assignEvents();


// --- img slider ---
});


