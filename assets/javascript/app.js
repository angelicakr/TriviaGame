$(document).ready(function() {

// global variable
// --------------------------------------------------------------------

    var questions = [
            {
                question: "What city is home to the world's tallest ferris wheel?",
                answers: ["A) Orlando","B) New York City","C)Las Vegas","D) London"],
                answer: "London"
            },
            {
                question: "The Bahamas is one of the most popular destinations for U.S. residents to visit in the Caribbean. On average, how cold does it get in the Bahamas?",
                answers: ["50 degrees","60 degrees","70 degrees","40 degrees"],
                answer: "70 degrees"
            },
            {
                question: " Finish this phrase with a well-known Italian city: All roads lead to _____",
                answers: ["A) Rome","B) Naples","C) Naples","D) Verona"],
                answer: "Rome"
            },
            {
                question: "What is the most visited turist attraction in the world",
                answers: ["Times Square","Disney World","The Colosseum","Eiffel Tower"],
                answer: "Eiffel Tower"
            },
            {
                question: "Where can you go to see Leonardo da Vinci's 'Mona Lisa' in person?",
                answers: ["National Gallery, Oslo", "Vatican Historical Museum", "Louvre Museum,Paris", "Smithsonian, Washington DC"],
                answer: "Caspian Sea"
            }    
    ];

    var correct = 0;
    var incorrect = 0;
    var counter = 60;
    var intervalId;

// functions
// --------------------------------------------------------------------

    function runTimer() {
        counter = 30;
        clearInterval(intervalId);
        intervalId = setInterval(decrementTimer, 1000)
    }

    function decrementTimer() {
        counter--;
        $('.timer').text(counter);
        console.log(counter);
        if (counter === 0) {
            stopTimer();
            console.log('time over');
        }
    }
    function stopTimer() {
        clearInterval(intervalId);
        submitGame();
    }


    function addQuestions() {
        $('.question-box').html("");
        for (var i=0; i<questions.length; i++) {
            $('.question-box').append($("<h4>" + questions[i].question + "</h4>"));
            for (var k=0; k<questions[i].answers.length; k++) {
                $('.question-box').append($(`
                    <input type="radio" value=${questions[i].answers[k]} name="question-${i}">
                        ${questions[i].answers[k]}
                    <br>
                `));
            }
            $('.question-box').append('<hr>');
        }
    }


    function submitGame() {

        for (var i=0; i<questions.length; i++)  {
            $.each($(`input[name='question-${i}']:checked`), function() {
                console.log($(this).attr('value'));
                var userGuess = $(this).attr('value');
                if (userGuess === questions[i].answer) {
                    console.log('correct');
                    correct++;
                } else {
                    console.log('incorrect');
                    incorrect++;
                }
            });  
        }
        $('.correct').text(correct);
        $('.incorrect').text(incorrect);
        $('.end-screen').show();
        $('.question-box').hide();
        $('#submitGame').hide();
    }

    function newGame() {
        correct = 0;
        incorrect = 0;
        shuffleQuestions();
        shuffleAnswers();
        addQuestions();
        runTimer();
        $(".end-screen").hide();
        $('.question-box').show();
        $('#submitGame').show();
    }

    function shuffleQuestions() {
        questions.sort(function(a, b){return 0.5 - Math.random()});
    }

    function shuffleAnswers() {
        for (var i=0; i<questions.length; i++) {
            questions[i].answers.sort(function(a, b){return 0.5 - Math.random()});
        }   
    }



// main process
// --------------------------------------------------------------------
    
    
    newGame();

    $('#submitGame').on('click', function() {
        // submitGame();
        stopTimer();
    });

    $('#newGame').on('click', function() {
        newGame();
    });

});

