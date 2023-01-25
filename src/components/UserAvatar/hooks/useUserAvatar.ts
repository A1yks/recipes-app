import { useEffect } from 'react';
import { useAppSelector } from 'src/store/hooks';
import { User } from 'src/store/reducers/auth';

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
    const avatarUrl =
        typeof user?.avatar === 'string'
            ? `${process.env.NEXT_PUBLIC_URL}/static/images/avatars/${user.avatar}`
            : undefined;
    const avatarColor = avatarUrl === undefined && user !== null ? stringToColor(user.login) : undefined;

    return { avatarUrl, avatarColor };
}

function useUserAvatar() {
    const user = useAppSelector((state) => state.auth.user);
    const { avatarColor, avatarUrl } = getAvatarData(user);
    const loginFirstLetter = user?.login[0];

    return { avatarColor, avatarUrl, loginFirstLetter };
}

export default useUserAvatar;
