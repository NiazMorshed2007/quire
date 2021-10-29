export const setId = (str: string): string => {
   return `${str.toLowerCase().replace(/ /g, "_")}`
}