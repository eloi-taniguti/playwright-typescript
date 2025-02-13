/**
 * This function will return the the string with first letter in uppercase.
 * @param value - string to be updated.
*/
export const capitalizeFirstLetter = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * This function will return the total amount to be charged:
 * value + processing fee of 3.25%
 * @param value - string in US currency (eg: $1,500.00).
*/
export const totalAmount = (value: string) => {
    return (Number(value.replace(/[^0-9.-]+/g,"")) * 0.0325).toString()
}