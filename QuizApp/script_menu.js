function changeColor(name, final){
    if($(name).css('background-color') == 'rgb(0, 0, 255)'){ 
        $(name).css('background-color', 'yellow')
        setTimeout(function() {
            $(name).css('background-color', final)
        }, 2000)
        setTimeout(function() {
            $(name).css('background-color', 'blue')
        }, 4000)
    }
}

function showHow() {
    $( ".how-to" ).slideToggle(500)
    $("html, body").animate({ scrollTop: $(document).height() }, 600)
}