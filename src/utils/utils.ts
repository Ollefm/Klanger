export function getUserFriendlyAuthErrorMessage(error: any): string {
    
    const errorCode = error.code;
    let userFacingMessage = 'An unexpected error occurred. Please try again.'; // Default message
    
    if(error.message === "Username is already taken."){
        userFacingMessage = error.message;
        return userFacingMessage;
    }
    if(error.message === "You must provide a username with a minimum of 3 characters."){
        userFacingMessage = error.message;
        return userFacingMessage;
    }
    switch (errorCode) {
      case 'auth/email-already-in-use':
        userFacingMessage = 'This email address is already in use. Please try logging in or use a different email.';
        break;
      case 'auth/invalid-email':
        userFacingMessage = 'The email address is not valid. Please check the format.';
        break;
      case 'auth/weak-password':
        userFacingMessage = 'The password is too weak. Please choose a stronger password.';
        break;
      case 'auth/missing-password':
        userFacingMessage = "You must provide a password"
        break;  
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        userFacingMessage = 'Invalid email or password. Please check your credentials.';
        break;
      case 'auth/invalid-credential':
        userFacingMessage = 'Invalid email or passowrd'  
        break;
      case 'auth/too-many-requests':
        userFacingMessage = 'Too many attempts. Please try again later.';
        break;
      default:
        console.warn(`Unhandled Firebase Auth error code: ${errorCode}`);
        break;
    }
  
    return userFacingMessage;
  }


export function isLenientMatch(userGuess: string, songTitle : string): boolean {
  // Normalize both strings
    const normalizedGuess = userGuess.trim().toLowerCase();
    const normalizedTitle = songTitle.trim().toLowerCase();

    // Check for exact match first (current behavior)
    if (normalizedGuess === normalizedTitle) {
      return true;
    }

    // Remove punctuation and special characters
    const cleanGuess = normalizedGuess.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\']/g, "");

    const cleanTitle = normalizedTitle.replace(
      /[.,\/#!$%\^&\*;:{}=\-_`~()\']/g,
    ""
    );

    // Split into words
    const guessWords = cleanGuess
      .split(/\s+/)
      .filter((word) => word.length > 1);
    const titleWords = cleanTitle
      .split(/\s+/)
      .filter((word) => word.length > 1);

    // Filter out common words that don't add meaning
    const commonWords = [
      "the",
      "a",
      "an",
      "and",
      "or",
      "but",
      "of",
      "in",
      "on",
      "at",
      "to",
      "for",
    ];
    const importantGuessWords = guessWords.filter(
      (word) => !commonWords.includes(word)
    );
    const importantTitleWords = titleWords.filter(
      (word) => !commonWords.includes(word)
    );

    // Count how many important title words appear in the guess
    let matchingWords = 0;
    for (const titleWord of importantTitleWords) {
      if (
        importantGuessWords.some(
          (guessWord) =>
            guessWord.includes(titleWord) || titleWord.includes(guessWord)
        )
      ) {
        matchingWords++;
      }
    }

    // Calculate percentage of matching important words
    const matchPercentage = matchingWords / importantTitleWords.length;

    // Consider it correct if the user got at least 60% of important words
    // You can adjust this threshold based on desired difficulty
    const isMatch = matchPercentage >= 0.6;

    console.log(
      `Match percentage: ${(matchPercentage * 100).toFixed(1)}% - Required: 60%`
    );

    return isMatch;
}  

  