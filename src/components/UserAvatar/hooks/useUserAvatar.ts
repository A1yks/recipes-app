import { useEffect } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { User } from 'src/store/reducers/auth';
import getImageUrl from 'src/utils/getImageUrl';

function stringToColor(str: string) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function getAvatarData(user: User | null) {
    const avatarUrl = typeof user?.avatar === 'string' ? getImageUrl(user.avatar, 'avatars') : undefined;
    const avatarColor = avatarUrl === undefined && user !== null ? stringToColor(user.login) : undefined;

    return { avatarUrl, avatarColor };
}

function useUserAvatar(user?: User) {
    const finalUser = useAppSelector((state) => (user === undefined ? state.auth.user : user));
    const { avatarColor, avatarUrl } = getAvatarData(finalUser);
    const loginFirstLetter = finalUser?.login[0];

    return { avatarColor, avatarUrl, loginFirstLetter };
}

export default useUserAvatar;
