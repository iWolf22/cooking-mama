var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
var textbox = $("#textbox");
var instructions = $("#instrctions");
var content = '';
var writeContent = false;
recognition.continuous = true;

recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;

    var transcriptList = transcript.split(" ");
    for (var i = 0; i < transcriptList.length; i++) {
        if (transcriptList[i] === "start") {
            writeContent = true;
        }
        if (transcriptList[i] === "submit") {
            writeContent = false;
            document.getElementById('submitSpeechText').click();
        }
    }

    if (writeContent === true) {
        content += transcript;
    }
    else {
        content = '';
    }

    textbox.val(content);
}

$("#start-btn").click(function(event) {

    if (content.length) {
        content += "";
    }

    recognition.start();
})

document.getElementById('start-btn').click();
document.getElementById('soundplayer').click();

window.scrollTo(0, document.body.scrollHeight);