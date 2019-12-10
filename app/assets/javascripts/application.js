// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require jquery.flexslider
//= require_tree .


$(document).ready(function() {
// --- svg header logo
    $.fn.christmas = function () {
        $(this).each(function () {
            $(this).html($(this).text().split("").map(function (v, i) {
                return '<span class="christmas-' + (i % 2 == 0 ? 'gold' : 'blue') + '">' + v + '</span>';
            }).join(""));
        });
    };
    $('h1.christmas').christmas();


});