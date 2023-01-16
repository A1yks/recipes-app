import { DataTypes, InferAttributes, Model, ModelAttributeColumnOptions } from 'sequelize';

/**
 * Decimal values are returned as strings. Here strings are converted to numbers.
 */
export function decimalType<M extends Model>(
    key: keyof InferAttributes<M>,
    precision = 8,
    scale = 2
): ModelAttributeColumnOptions<M> {
    return {
        type: DataTypes.DECIMAL(precision, scale),
        get() {
            const value = this.getDataValue(key);

            if (typeof value === 'string') {
                return parseFloat(value);
            }

            return value;
        },
    };
}
