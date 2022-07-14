/**
 * Questions must be divided into 4 parts
 * 1 - Question
 * 2 - Correct Answer
 * 3 - Incorrect answers
 * 4 - Difficulty
 * 
 * Answers must be randomly inserted into the blocks
 * Ex.: Correct answer in one instance can be the first, but in another, can be the second, third or fourth selection
 * 
 * Difficulty must increase the more answers are responded correctly
 * Ex.: First bunch of questions have a difficulty rating of 1, and can go up to 3
 * 
 * Questions can't appear more than once in a session
 * This is to prevent facilitation on the progress
 * Ex.: Question 1 can't appear in question 2
 * 
 * Create this using an array for the questions
 * Ex.: question, answer_correct, answer_1, answer_2, answer_3, difficulty, has_answered
 */

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

let questions_arr = []
let current_question = []
let answers = []

let question_number = 1
let difficulty = 1

let current_answer = ''

$(document).ready(function(){
    $('.quiz-body').css('display', 'none')
    $('.game').css('display', 'none')

    readJson()
    setTimeout(function() {
        fillQuestionnaire()
        changeTitle()
    }, 250)
})

function readJson() {
    var dfrd = $.Deferred();
    text = 'Loading Questions'

    $('#title').text(text)
    $('#text-question').text(text)
    
    $.getJSON("questions.json", function(data){
        questions_arr = data
        console.log(questions_arr);
    }).fail(function(){
        console.log("An error has occurred.")
    })

    return dfrd.resolve().promise();
}

function changeTitle() {
    text = 'Questions '+question_number+'/15'
    $('#title').text(text)
    $('#text-question').text(text)

    $('.quiz-body').css('display', 'block')
    $('.game').css('display', 'block')
}

function fillQuestionnaire() {
    questions = questions_arr.filter(a => a.difficulty == difficulty && a.has_answered == 0)
    if(questions != ''){
        question = questions[Math.floor(Math.random()*questions.length)]
        
        $.map( questions_arr, function( val, i ) {
            if(val['question'] == question['question'])
                questions_arr[i]['has_answered'] = 1
        });

        current_question = question
        current_answer = question['answer_correct']
        answers = shuffle([question['answer_correct'], question['answer_1'], question['answer_2'], question['answer_3']])

        $('#question').text(current_question['question'])

        for(i = 0; i < answers.length; i++) {
            $('#answer_'+i).text(answers[i])
        }
    } else {
        alert('There seems to be no more questions available for now :(')
        window.location.href='index.html'
        window.location.assign('index.html')
    }
}

function checkAnswer(id) {
    answer = $('#answer_'+id).text()
    min = 2000
    max = 4000
    time_of_suspense = Math.floor(Math.random() * (max - min + 1)) + min
    time_end = time_of_suspense + 2000

    $('#answer_'+id).css('background-color', 'yellow')

    if(answer == current_answer){
        setTimeout(function() {
            $('#answer_'+id).css('background-color', 'green')
        }, time_of_suspense)
        setTimeout(function() {
            alert('That is correct')
            $('#answer_'+id).css('background-color', '')
            question_number++
            changeTitle()
            
            if(question_number == 6 || question_number == 11)
                difficulty++
            
            fillQuestionnaire()
        }, time_end)
    } else {
        setTimeout(function() {
            $('#answer_'+id).css('background-color', 'red')
        }, time_of_suspense)
        setTimeout(function() {
            alert('Uh-oh, it seems that is the incorrect answer')
            window.location.href='index.html'
            window.location.assign('index.html')
        }, time_end)
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
