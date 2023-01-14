import CategoriesService from 'backend/services/categories';
import { ErrorTypes } from 'backend/types/errors';
import errorsHandler from 'backend/utils/errorsHander';
import { CreateCategoryReq, DeleteCategoryReq, EditCategoryReq, GetCategoriesReq, SearchCategoriesReq } from './types';

namespace CategoriesController {
    export async function createCategory(req: Server.Request<CreateCategoryReq>, res: Server.Response) {
        const { categoryName } = req.body;

        try {
            const category = await CategoriesService.createCategory(categoryName);

            res.status(201).json({ data: category });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while creating new category',
            });
        }
    }

    export async function getCategories(req: Server.Request<never, never, GetCategoriesReq>, res: Server.Response) {
        const { categoryIds: categoryIdsString } = req.query;

        try {
            const categoryIds = categoryIdsString?.split(',').map((categoryId) => +categoryId);
            const categories = await CategoriesService.getCategories(categoryIds);

            res.status(200).json({ data: categories });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while obtaining categories',
            });
        }
    }

    export async function searchCategories(
        req: Server.Request<never, never, SearchCategoriesReq>,
        res: Server.Response
    ) {
        const { categoryName } = req.query;

        try {
            const categories = await CategoriesService.searchCategories(categoryName);

            res.status(200).json({ data: categories });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while searching for the category',
            });
        }
    }

    export async function editCategory(req: Server.Request<EditCategoryReq>, res: Server.Response) {
        const { categoryId, categoryName } = req.body;

        try {
            const updatedCategory = await CategoriesService.editCategoryName(categoryName, categoryId);

            if (updatedCategory === null) {
                throw new Error('Category with provided id does not exist', { cause: ErrorTypes.NOT_FOUND });
            }

            res.status(200).json({ data: updatedCategory });
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occucred while editing the category',
                expectedErrors: [[ErrorTypes.NOT_FOUND, 404]],
            });
        }
    }

    export async function deleteCategory(req: Server.Request<DeleteCategoryReq>, res: Server.Response) {
        const { categoryId } = req.body;

        try {
            const deleted = await CategoriesService.deleteCategory(categoryId);

            if (!deleted) {
                throw new Error('Category with provided id does not exist', { cause: ErrorTypes.DELETION_ERROR });
            }

            res.status(204).send();
        } catch (err) {
            errorsHandler(err, {
                res,
                unexpectedErrMsg: 'An unexpected error occured while deleting the category',
                expectedErrors: [[ErrorTypes.DELETION_ERROR, 404]],
            });
        }
    }
}

export default CategoriesController;
