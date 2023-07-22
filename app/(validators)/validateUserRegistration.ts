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
    errors.email = '*Please enter a valid email.';
  } else if (email !== undefined) errors.email = '';

  // Validate username
  if (username !== undefined && (username.length < 3 || username.length > 16)) {
    errors.username = '*Username must contain between 3 to 16 characters.';
  } else if (
    username !== undefined &&
    !username.match(/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/)
  ) {
    errors.username =
      '*Usernames must include at least one letter and can contain numbers, hyphens, and underscores.';
  } else if (username !== undefined) errors.username = '';

  // Validate password
  if (password !== undefined && password.length < 8) {
    errors.password = '*Password must contain at least 8 characters.';
  } else if (
    password &&
    password !== '' &&
    !password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&;:])[A-Za-z\d@$!%*?&;:]{8,}$/,
    )
  ) {
    errors.password =
      '*Password must be at least 8 characters long and contain at least one alphabetic character, one digit, and one special character from the set @$!%*#?&;';
  } else if (password !== undefined) errors.password = '';

  // Validate password confirmation
  if (
    passwordConfirm !== '' &&
    passwordConfirm !== password &&
    password !== ''
  ) {
    errors.passwordConfirm =
      '*Password confirmation does not match the original password. Please ensure both passwords are the same.';
  } else if (
    passwordConfirm === '' ||
    passwordConfirm === password ||
    password === ''
  )
    errors.passwordConfirm = '';

  // Validate DOB
  function isOverThirteen(birthday: Date) {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age >= 13;
  }
  if (
    typeof dob !== 'string' &&
    dob &&
    dob.day === '' &&
    dob.month === '' &&
    dob.year === ''
  ) {
    errors.dob = '*Please enter a valid date.';
  } else if (typeof dob !== 'string' && dob) {
    const dobDate = new Date(
      Number(dob.year),
      Number(dob.month) - 1,
      Number(dob.day),
    );

    if (!isOverThirteen(dobDate)) {
      errors.dob =
        "*We're sorry, but you need to be at least 13 years old to use this site. Please come back when you're old enough!";
    } else errors.dob = '';
    if (Number(dob.year) < 1900) {
      errors.dob = '*Please enter a valid date.';
    }
  }
  return errors;
};
export default validateUserRegistration;
