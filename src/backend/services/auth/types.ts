import { UserAttrs } from '@backend/models/User';

export type UserCreationData = Omit<UserAttrs, 'id'>;
