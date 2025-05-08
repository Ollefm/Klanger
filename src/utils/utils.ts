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
  