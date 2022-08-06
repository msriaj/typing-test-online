let listOfpera = []






let timer, maxTime = 60, timeLeft = maxTime;
let isTyping;

function textInput(params) {
    let correctCount = 0;
    let incorrect = 1;
    let typedText = document.getElementById("type").value;
    let paragraph = document.getElementById("typingText").innerText;

    if (correctCount + incorrect < paragraph.length - 1 && timeLeft > 0) {

        if (!isTyping) {
            timer = setInterval(intTimer, 1000);
            isTyping = true;
            document.getElementById("border").classList.add("box")
        }


        typedText = typedText.split("");
        paragraph = paragraph.split("");


        for (let index = 0; index < typedText.length; index++) {

            const element = paragraph[index];
            if (paragraph[index] === typedText[index]) {
                correctCount++;

                paragraph[index] = `<span class="active">${paragraph[index]}</span>`;


                document.getElementById("typingText").innerHTML = paragraph.join("");

            }
            else {
                paragraph[index] = `<span class="red">${paragraph[index]}</span>`;
                document.getElementById("mistake").innerText = incorrect++;
                document.getElementById("typingText").innerHTML = paragraph.join("");
            }
        }
        let wpmCount = Math.round(((correctCount / 5) / (maxTime - timeLeft)) * 60);
        wpmCount = wpmCount < 0 || !wpmCount || wpmCount === Infinity ? 0 : wpmCount;
        document.getElementById("wpm").innerText = wpmCount;
        document.getElementById("cpm").innerText = correctCount;

    }
    else {
        clearInterval(timer);
    }

}


function readyToType() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => listOfpera = json);

    document.addEventListener("keypress", () => {
        document.getElementById("type").focus();

    });
    document.getElementById("typingText").innerText = listOfpera[Math.floor(Math.random() * 100)].body;

}

readyToType();

function intTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;


    }
    else {
        clearInterval(timer)
    }
}
