export const Acroname = (str: string | null | undefined): string | undefined => {
    if(typeof str === "string") {
        const w = str.split(" ");
        if (w.length < 2) {
            return (w[0].charAt(0) + w[0].charAt(1)).toUpperCase();
        } else {
            return (w[0].charAt(0) + w[w.length - 1].charAt(0)).toUpperCase();
        }
    }
};