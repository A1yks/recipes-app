import db from 'backend/db';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export type CategoryAttrs = InferAttributes<Category>;

class Category extends Model<CategoryAttrs, InferCreationAttributes<Category>> {
    declare id: CreationOptional<number>;
    declare name: string;
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
        },
    },
    {
        sequelize: db,
        tableName: 'categories',
    }
);

export default Category;
