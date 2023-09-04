const validateLogin = (payload: {
  emailUsername: string;
  password: string;
}) => {
  const { emailUsername, password } = payload;
  let email;
  let username;

  let err = '';

  if (emailUsername.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
    email = emailUsername;
  } else {
    username = emailUsername;
    if (username.length < 3 || username.length > 20) {
      err =
        "We couldn't verify your credentials. Please ensure that your Username/Email and password are entered correctly and try again";
    }
  }
  const payloadToSend = email
    ? {
        email,
        password,
      }
    : {
        username,
        password,
      };
  return { payloadToSend, err };
};
