/**
 * This function will return the the string with first letter in uppercase.
 * @param value - string to be updated.
*/
export const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
}
