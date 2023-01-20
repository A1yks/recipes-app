import { RatingAttrs } from '@backend/models/Rating';

export type RatingCreationData = Omit<RatingAttrs, 'id'>;
