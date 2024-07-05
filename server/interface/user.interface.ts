interface IRegistrationBody {
    username: string;
    email: string;
    password: string;
    photo?: string;
  }

// Define the interface for the activation token
interface IActivationToken {
    token: string;
    activationCode: string;
  }

// Activate New Users
interface IActivationRequest {
    activation_token: string,
    activation_code: string,
}

// Login Interface 
interface ILoginRequest {
   email: string;
   password: string;
}


// Social Auth 
interface ISocialBody {
  email: string;
  username: string;
  photo: string
}


//  Update User's Info
interface IUpdateUserInfo {
  email: string;
  username: string;
}

// Update User's Password
interface IUpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}

// Update User's Profile image 

interface IUpdateUserProfileImage {
  photo: string
}

  export {
    IRegistrationBody,
    IActivationToken,
    IActivationRequest,
    ILoginRequest,
    ISocialBody,
    IUpdateUserInfo,
    IUpdateUserPassword,
    IUpdateUserProfileImage
  }
