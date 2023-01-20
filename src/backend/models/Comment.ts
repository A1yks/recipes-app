import db from '@backend/db';
import {
    Association,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import Recipe from './Recipe';
import User from './User';

export type CommentAttrs = InferAttributes<Comment>;

class Comment extends Model<CommentAttrs, InferCreationAttributes<Comment>> {
    declare id: CreationOptional<number>;
    declare content: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare recipeId: ForeignKey<Recipe['id']>;
    declare parentId: ForeignKey<Comment['id']>;
    declare replies?: NonAttribute<CommentAttrs[]>;

    public declare static associations: {
        replies: Association<Comment, Comment>;
    };
}

function getter(attr: keyof CommentAttrs) {
    return function (this: Comment) {
        if (this.isSoftDeleted()) {
            return undefined;
        }

        return this.getDataValue(attr);
    };
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            get: getter('content'),
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
            get: getter('userId'),
        },
        recipeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Recipe,
                key: 'id',
            },
        },
        parentId: {
            type: DataTypes.INTEGER,
            references: {
                model: Comment,
                key: 'id',
            },
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    { sequelize: db, tableName: 'comments', timestamps: true, paranoid: true }
);

export default Comment;
