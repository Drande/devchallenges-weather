
export const getLocationByName = (name: string) => {
    return fetch(`https://restcountries.com/v3.1/name/${name}`)
}