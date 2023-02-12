import { Avatar } from '@mui/material';
import Image from 'next/image';
import useUserAvatar from './hooks/useUserAvatar';
import { UserAvatarProps } from './UserAvatar.types';

function UserAvatar(props: UserAvatarProps) {
    const { avatarColor, avatarUrl, loginFirstLetter } = useUserAvatar(props.user);
    const { size } = props;

    return (
        <Avatar
            sx={{
                bgcolor: avatarColor,
                width: size,
                height: size,
                fontSize: typeof size === 'number' ? size / 2 : undefined,
                '& img': {
                    objectFit: 'cover',
                },
                ...props.sx,
            }}
        >
            {avatarUrl !== undefined ? (
                <Image src={avatarUrl} fill alt="" priority sizes={`${size || 40}px`} />
            ) : (
                loginFirstLetter
            )}
        </Avatar>
    );
}

export default UserAvatar;
