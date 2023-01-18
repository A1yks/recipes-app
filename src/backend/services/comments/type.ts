import { CommentAttrs } from 'backend/models/Comment';

export type CommentCreationData = Required<Omit<CommentAttrs, 'id' | 'createdAt' | 'updatedAt'>>;
