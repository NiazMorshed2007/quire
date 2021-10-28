export const setId = (str: string, your_txt?: string): string => {
   return `${str.toLowerCase().replace(/ /g, "_")}${your_txt}`
}