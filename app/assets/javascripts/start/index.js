$(document).ready(function(){
    const slidePauseSeconds = 10;
    let paths = [];
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

    function getNewPictures () {
        return $.post( "/fetch", { data: paths }, function(data){
           return data
        })
    }

    function changeSlideTo(index, seconds = slidePauseSeconds) {
        slider.flexslider(index)
        slider.flexslider("pause")

        setTimeout(function(){
            slider.flexslider("play");
        }, (seconds * 1000));
    }

    function assignEvents(){
        $('.grid_image').click(function(){
            let index = parseInt($(this).attr('alt'));
            changeSlideTo(index);
        });
    }

// --- img slider ---
    // https://github.com/woocommerce/FlexSlider/wiki/FlexSlider-Properties
    updatePaths();

    slider.flexslider({
        before: function(){
            console.log('searching for new pictures')
        },
        after: function(){
            getNewPictures().then(function (data) {
                if(data.length >= 1){
                    data.forEach(function(url){
                        let li = "<li>" + "<img src='" + url + "' class='slide_image' \>" + "</li>";
                        slider.data('flexslider').addSlide($(li));
                        let i = slider.data('flexslider').slides.length - 1;
                        let gridImage = '<div class="col-md-4 p-4">' + '<img src="' + url + '" alt="' + i + '" class="grid_image"\></div>';
                        $('#grid').append(gridImage);
                        assignEvents();
                    });

                    console.log(`${data.length} ${data.length > 1 ? "neue Fotos" : "neues Foto"} gefunden!`)
                    changeSlideTo(lastIndex);

                    updatePaths();
                } else {
                    console.log('no images found')
                }
            })
        }
    });

    assignEvents();

// --- img slider ---
});


