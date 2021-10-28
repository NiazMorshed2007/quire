import {AvatarBackgrounds} from "./avatarback";

export const setRandomAvatarBack = (): string => {
    return AvatarBackgrounds[Math.floor(Math.random() * (AvatarBackgrounds.length - 0) + 0)];
}