interface ITab {
    text: string,
    id: string,
}

export interface IHeader {
    name: string,
    image: string,
    tabs: ITab[],
}