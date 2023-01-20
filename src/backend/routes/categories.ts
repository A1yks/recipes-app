import CategoriesController from '@backend/controllers/categories';
import {
    createCategorySchema,
    deleteCategorySchema,
    editCategorySchema,
    getCategoriesSchema,
    searchCategoriesSchema,
} from '@backend/controllers/categories/validation';
import ValidationMiddleware from '@backend/middleware/schema-validation';
import TokensMiddleware from '@backend/middleware/tokens';
import { Router } from 'express';

const router = Router();

router.post(
    '/create',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(createCategorySchema),
    CategoriesController.createCategory
);

router.get(
    '/',
    ValidationMiddleware.validate(getCategoriesSchema, { validateQuery: true }),
    CategoriesController.getCategories
);

router.get(
    '/search',
    ValidationMiddleware.validate(searchCategoriesSchema, { validateQuery: true }),
    CategoriesController.searchCategories
);

router.patch(
    '/edit',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(editCategorySchema),
    CategoriesController.editCategory
);

router.delete(
    '/delete',
    TokensMiddleware.verifyAcessToken,
    ValidationMiddleware.validate(deleteCategorySchema),
    CategoriesController.deleteCategory
);

export default router;
