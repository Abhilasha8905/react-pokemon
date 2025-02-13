
// ** Function For Capitalize First Letter
export const capitalizeFirstLetter = (str) => {
    let capitalized = ''
    if (str) {
        capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    }

    return capitalized;
}

