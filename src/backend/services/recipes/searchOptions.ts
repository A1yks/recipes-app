import Category from '@backend/models/Category';
import Ingridient from '@backend/models/Ingridient';
import Instruction from '@backend/models/Instruction';
import Nutrition from '@backend/models/Nutrition';
import Rating from '@backend/models/Rating';
import RecipePart from '@backend/models/RecipePart';
import RecipePhoto from '@backend/models/RecipePhoto';
import User from '@backend/models/User';
import { IncludeOptions, Sequelize, FindAttributeOptions, GroupOption } from 'sequelize';

export const includeArray: IncludeOptions[] = [
    {
        model: Category,
        as: 'categories',
        through: {
            attributes: [],
        },
    },
    {
        model: Instruction,
        as: 'instructions',
        separate: true,
        order: [['stepNumber', 'ASC']],
    },
    {
        model: Nutrition,
        as: 'nutrition',
    },
    {
        model: RecipePhoto,
        as: 'photos',
        separate: true,
        order: [['createdAt', 'ASC']],
    },
    {
        model: RecipePart,
        as: 'parts',
        include: [
            {
                model: Ingridient,
                as: 'ingridients',
            },
        ],
    },
    {
        model: Rating,
        as: 'ratings',
        attributes: [],
    },
    {
        model: User.scope('recipeAuthor'),
        as: 'author',
    },
];

export const includeArrayRequired: IncludeOptions[] = [
    {
        model: Category,
        as: 'categories',
        attributes: [],
        required: true,
    },
    {
        model: Instruction,
        as: 'instructions',
        attributes: [],
        order: [['stepNumber', 'ASC']],
        required: true,
    },
    {
        model: Nutrition,
        as: 'nutrition',
        attributes: [],
        required: true,
    },
    {
        model: RecipePhoto,
        as: 'photos',
        attributes: [],
        order: [['createdAt', 'ASC']],
    },
    {
        model: RecipePart,
        as: 'parts',
        attributes: [],
        required: true,
        include: [
            {
                model: Ingridient,
                as: 'ingridients',
                attributes: [],
                required: true,
            },
        ],
    },
    {
        model: Rating,
        as: 'ratings',
        attributes: [],
    },
];

export const attributes = {
    include: [[Sequelize.cast(Sequelize.fn('AVG', Sequelize.col('ratings.value')), 'real'), 'rating']],
} satisfies FindAttributeOptions;

export const group: GroupOption = [
    'Recipe.id',
    'categories.id',
    'categories->RecipeCategory.recipeId',
    'categories->RecipeCategory.categoryId',
    'nutrition.id',
    'parts.id',
    'parts->ingridients.id',
    'author.id',
];
