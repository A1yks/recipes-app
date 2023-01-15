import Category from 'backend/models/Category';
import { Op } from 'sequelize';

namespace CategoriesService {
    export async function createCategory(categoryName: string) {
        return await Category.create({ name: categoryName });
    }

    export async function getCategory(categoryId: Category['id']) {
        return await Category.findByPk(categoryId);
    }

    export async function getCategories(categoryIds?: Category['id'][]) {
        if (categoryIds === undefined) {
            return await Category.findAll();
        }

        return await Category.findAll({
            where: {
                id: categoryIds,
            },
        });
    }

    export async function categoryExists(categoryId: Category['id']) {
        const category = await getCategory(categoryId);

        return category;
    }

    export async function searchCategories(categoryName: Category['name']) {
        return await Category.findAll({
            where: {
                name: {
                    [Op.like]: `%${categoryName}%`,
                },
            },
        });
    }

    export async function editCategoryName(categoryName: Category['name'], categoryId: Category['id']) {
        const category = await Category.findByPk(categoryId);

        if (category === null) {
            return null;
        }

        return await category.update({ name: categoryName });
    }

    export async function deleteCategory(categoryId: Category['id']) {
        const deletedRows = await Category.destroy({ where: { id: categoryId } });

        return deletedRows > 0;
    }
}

export default CategoriesService;
