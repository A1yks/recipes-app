import { Avatar } from '@mui/material';
import useUserAvatar from './hooks/useUserAvatar';
import { UserAvatarProps } from './UserAvatar.types';

function UserAvatar(props: UserAvatarProps) {
    const { avatarColor, avatarUrl, loginFirstLetter } = useUserAvatar();
    const { size } = props;

    return (
        <Avatar
            src={avatarUrl}
            sx={{
                bgcolor: avatarColor,
                width: size,
                height: size,
                fontSize: typeof size === 'number' ? size / 2 : undefined,
                ...props.sx,
            }}
        >
            {loginFirstLetter}
        </Avatar>
    );
}

export default UserAvatar;
