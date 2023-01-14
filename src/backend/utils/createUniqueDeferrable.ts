import { Deferrable, InferAttributes, Model, ModelStatic } from 'sequelize';

type Index = {
    name: string;
};

function getConstraintName(tableName: string, fields: string[]) {
    const name = fields.reduce((acc, curr) => acc + `_${curr}`, `${tableName}`);

    return name + '_key';
}

async function constraintExists(table: ModelStatic<Model>, constraintName: string) {
    const qi = table.sequelize?.getQueryInterface();
    const indexes = await qi?.showIndex(table.tableName);

    if (Array.isArray(indexes)) {
        return indexes.find((i: Index) => i.name === constraintName) !== undefined;
    }

    return false;
}

/**
 * Creates unique deferrable constraint.
 * @param table Class that represents table.
 * @param fields Fields that need to be unique.
 * @param deferrable Deferrable type. Default is `Deferrable.INITIALLY_IMMEDIATE`
 */
async function createUniqueDeferrable<MS extends ModelStatic<Model>, M extends InstanceType<MS>>(
    table: MS,
    fields: Array<keyof InferAttributes<M>>,
    deferrable: Deferrable.Deferrable = new Deferrable.INITIALLY_IMMEDIATE()
) {
    const constraintName = getConstraintName(table.tableName, fields as string[]);
    const isConstraintExists = await constraintExists(table, constraintName);

    if (!isConstraintExists) {
        await table.sequelize?.getQueryInterface().addConstraint(table.tableName, {
            fields: fields as string[],
            type: 'unique',
            name: constraintName,
            deferrable,
        });
    }
}

export default createUniqueDeferrable;
