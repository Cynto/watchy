const validateUserRegistration = (
  payload:
    | {
        email: string;
        username: string;
        password: string;
        passwordConfirm: string;
        dob: {
          day: string;
          month: string;
          year: string;
        };
      }
    | { [key: string]: string },
  errs: {
    email: string;

    username: string;

    password: string;

    passwordConfirm: string;

    dob: string;
  },
) => {
  const { email, username, password, passwordConfirm, dob } = payload;

  let errors = { ...errs };

  //Validate email
  if (
    email !== undefined &&
    !email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
  ) {
    errors.email = "Email address provided must be valid.";
  } else if (email !== undefined) errors.email = "";

  // Validate username
  if (username !== undefined && (username.length < 3 || username.length > 16)) {
    errors.username =
      "Username provided must contain between 3 to 16 characters.";
  } else if (
    username !== undefined &&
    !username.match(/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/)
  ) {
    errors.username =
      "Usernames must include at least one letter and can contain numbers, hyphens, and underscores.";
  } else if (username !== undefined) errors.username = "";

  return errors;
};
export default validateUserRegistration;
