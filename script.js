$(document).ready(function(){
    let selectedCard;
    let pairsGotten;
    let totalGuesses;
    let highscore;

    function restartGame() {
        selectedCard = null;
        pairsGotten = 0;
        totalGuesses = 0;
        updateScores();
        const classNames = ["fa-bug", "fa-code", "fa-bath", "fa-coffee", "fa-keyboard", "fa-user-secret", "fa-shield-alt", "fa-bomb", "fa-frog",
         "fa-bug", "fa-code", "fa-bath", "fa-coffee", "fa-keyboard", "fa-user-secret", "fa-shield-alt", "fa-bomb", "fa-frog"];
        shuffleArray(classNames);
        let x = $(".card").toArray();
        for (i = 0; i < x.length; i++) {
            let element = x[i];
            let newClass = classNames[i];
            $(element).parent().css("transform", "rotateY(0deg)");
            $(element).removeClass("matched");
            setTimeout(() => $(element).children("i").attr("class", "fas fa-9x " + newClass), 800);
            
        }
    }
    restartGame();
    //$("#restart-btn").hide();

    $(".backside").click(function (e) { 
        let mySelf = $(this);
        $(this).parent().css("transform", "rotateY(180deg)");
        if (selectedCard == null) {
            selectedCard = $(this).parent();
        } else {
            if ($(selectedCard).children(".card").children("i").attr("class") === $(this).parent().children(".card").children("i").attr("class")) {
                $(selectedCard).children(".card").addClass("matched");
                mySelf.parent().children(".card").addClass("matched")
                selectedCard = null;
                pairsGotten++;
            } else {
                otherCard = selectedCard;
                selectedCard = null;
                setTimeout(function() {
                    console.log("Done");
                    $(otherCard).css("transform", "rotateY(0deg)");
                    mySelf.parent().css("transform", "rotateY(0deg)");
                }, 1000);
            }
            totalGuesses++;
            updateScores();
        }
    });

    function updateScores () {
        $("#guesses").text("Guesses: " + totalGuesses);
        $("#correct").text("Correct: " + pairsGotten + "/9");
        if (pairsGotten >= 9) {
            $("#restart-btn").css("opacity", "100%").css("pointer-events", "all");
            if (totalGuesses < highscore || highscore === undefined) {
                highscore = totalGuesses;
                $("#hscore-txt").text(highscore);
            }
        }
      }

    $("#restart-btn").click(function () {
        restartGame();
        $("#restart-btn").css("opacity", "0%").css("pointer-events", "none");
    });
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    } 
}