let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#New-game");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true; // playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", newGame);

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("The box was clicked");
        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        turnO = !turnO; // Toggle player turn
        box.disabled = true;

        checkWinner();
    });
});

function checkWinner() {
    for (const pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner is", pos1Val);
                showWinner(pos1Val);
                return; // Exit the function after a winner is found
            }
        }
    }

    // Check for a tie
    if (isBoardFull()) {
        showWinner("Tie");
    }
}

function showWinner(winner) {
    msg.innerText = `${winner === "Tie" ? "It's a Tie!" : "Player " + winner + " wins!"}`;
    msgContainer.classList.remove("hide");
}

function isBoardFull() {
    return Array.from(boxes).every((box) => box.innerText !== "");
}

function resetGame() {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });

    msgContainer.classList.add("hide");
    turnO = true; // Reset the player turn
}

function newGame() {
    resetGame(); // Reset the game when starting a new game
}
