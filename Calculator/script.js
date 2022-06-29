function addValue(input) {
    value = $('#display').val();
    comma = value.split('+').join(',').split('-').join(',').split('x').join(',').split('/').join(',');
    arr = comma.split(',');
    last_value = $(arr).get(-1);

    if(input == '.' && last_value.indexOf('.') > -1)
        return;
    else if (input == '.' && last_value == '')
        inputValue(value+'0', input)
    else
        inputValue(value, input)
}

function addSymbol(input) {
    value = $('#display').val();
    last_char = value.charAt(value.length - 1)

    if(last_char == '.')
        input = '0'+input
    
    if(last_char != input && (last_char == '+' || last_char == '-' || last_char == 'x' || last_char == '/'))
        inputValue(value.slice(0,-1), input)
    
    if(value != '' && (last_char != '+' && last_char != '-' && last_char != 'x' && last_char != '/'))
        inputValue(value, input)
}

function clearInput() {
    $('#display').val('');
}

function inputValue(value, input){
    $('#display').val(value + input);
    var left_pos = $('#display').scrollLeft();
    $("#display").animate({scrollLeft: left_pos + 200}, 800);
}

// Finish function to be able to acquire the symbols, and calculate the total inputted in the field
function getResult() {
    value = $('#display').val();
    comma = value.split('+').join(',').split('-').join(',').split('x').join(',').split('/').join(',');
    arr = comma.split(',');
    
    console.log(arr);
}