// ... crickets...

let wordToGuess;

const startBtn = document.querySelector("#startBtn");
startBtn.addEventListener("click", () => {
  fetch("http://localhost:8000/hangman/words", {
    method: "GET",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res) => {
      wordToGuess = res;
      console.log(wordToGuess);
    });
});
