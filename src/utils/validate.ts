/**
 * Checking for the absence of spaces and the presence of only Latin characters
 * @param {string} title
 */
export const isTitleValidate = (title:string) => {
    return /^[A-Za-z]+$/.test(title);
};

/**
 * Checking email
 * @param {string} email
 */
export const isEmailValid = (email:string) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

/**
 * Checking password
 * At least one upper case English letter
 * At least one lower case English letter
 * At least one digit
 * At least one special character
 * Minimum eight symbols
 * @param {string} password
 */
export const isPasswordValid = (password:string) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
};