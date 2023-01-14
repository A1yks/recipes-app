import db from 'backend/db';
import {
    BelongsToManyAddAssociationMixin,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import Recipe from './Recipe';

export type CategoryAttrs = InferAttributes<Category>;

class Category extends Model<CategoryAttrs, InferCreationAttributes<Category>> {
    declare id: CreationOptional<number>;
    declare name: string;

    declare addRecipe: BelongsToManyAddAssociationMixin<Recipe, Recipe['id']>;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize: db,
        tableName: 'categories',
    }
);

export default Category;
