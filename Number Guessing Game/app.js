const readline = require('readline')

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
})


const playGame = () => {
    // Generate a random number between 1 and 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0; // Variable to count the number of attempts

    console.log("I've selected a number between 1 and 100. Try to guess it!");

    // Function to handle the user's guess
    const guessNumber = () => {
        rl.question('Enter your guess: ', (input) => {
            const guess = parseInt(input); // Convert input to a number
            attempts++; // Increment attempts

            // Check if the guess is a valid number
            if (isNaN(guess)) {
                console.log('Please enter a valid number.');
                guessNumber(); // Ask for another guess
            } else if (guess < randomNumber) {
                console.log('Too low! Try again.'); // Guess too low
                guessNumber(); // Ask for another guess
            } else if (guess > randomNumber) {
                console.log('Too high! Try again.'); // Guess too high
                guessNumber(); // Ask for another guess
            } else {
                // Correct guess
                console.log(`Congratulations! You guessed the number in ${attempts} attempts.`);
                rl.question('Do you want to play again? (yes/no): ', (answer) => {
                    // Ask if the user wants to play again
                    if (answer.toLowerCase() === 'yes') {
                        playGame(); // Start a new game
                    } else {
                        console.log('Thanks for playing! Goodbye!'); // Exit message
                        rl.close(); // Close the readline interface
                    }
                });
            }
        });
    };

    guessNumber(); // Start asking for guesses
};

playGame();