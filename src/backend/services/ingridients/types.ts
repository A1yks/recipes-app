import { IngridientAttrs } from 'backend/models/Ingridient';

export type IngridientCreationData = Omit<IngridientAttrs, 'id'>;

export type IngridientEditingData = Omit<IngridientCreationData, 'recipeId' | 'partId'>;
