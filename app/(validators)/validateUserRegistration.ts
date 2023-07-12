
const validateUserRegistration = (payload: {
    email: string,
    username: string,
    password: string,
    passwordConfirm: string,
    dob: {
        day: string,
        month: string,
        year: string
    }
}) => {
    const {email, username, password, passwordConfirm, dob} = payload;
    const errors = [];



    //Validate email
    if(!email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        const err = {
            field: 'email',
            message: 'Email provided must be valid.'
        }
        errors.push(err)
    }

    // Validate username
    if(username.length < 3 || username.length > 16) {
        const err = {
            field: 'username',
            message: 'Username provided must contain between 3 to 16 characters.'
        }
        errors.push(err)
    }

    return errors
}
export default validateUserRegistration;