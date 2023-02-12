import { User } from 'src/store/reducers/auth';

export type UserAvatarProps = Props.WithSx & {
    size?: number;
    user?: User;
};
