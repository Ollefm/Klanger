export function getUserFriendlyAuthErrorMessage(error: any): string {

  const errorCode = error.code;
  let userFacingMessage = 'An unexpected error occurred. Please try again.'; // Default message

  if (error.message === "Username is already taken.") {
    userFacingMessage = error.message;
    return userFacingMessage;
  }
  if (error.message === "You must provide a username with a minimum of 3 characters.") {
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


export function isLenientMatch(userGuess: string, songTitle: string): boolean {

  const normalizedGuess = userGuess.trim().toLowerCase();

  const titleWithoutParentheses = songTitle.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const normalizedTitle = titleWithoutParentheses.toLowerCase();

  if (normalizedGuess === normalizedTitle) {
    return true;
  }

  const cleanGuess = normalizedGuess.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\']/g, "");

  const cleanTitle = normalizedTitle.replace(
    /[.,\/#!$%\^&\*;:{}=\-_`~()\']/g,
    ""
  );

  const guessWords = cleanGuess
    .split(/\s+/)
    .filter((word) => word.length > 1);
  const titleWords = cleanTitle
    .split(/\s+/)
    .filter((word) => word.length > 1);

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

  const matchPercentage = matchingWords / importantTitleWords.length;
  const isMatch = matchPercentage >= 0.6; // if the useGuess is above 60% it's considered accepted 

  console.log(
    `Match percentage: ${(matchPercentage * 100).toFixed(1)}% - Required: 60%`
  );

  return isMatch;
}

