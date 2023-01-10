import RefreshToken from 'backend/models/RefreshToken';
import User from 'backend/models/User';
import UserInfo from 'backend/models/UserInfo';

function buildRelations() {
    User.hasOne(RefreshToken, {
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    RefreshToken.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'userId',
    });

    User.hasOne(UserInfo, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'info',
        onDelete: 'CASCADE',
    });
    UserInfo.belongsTo(User, {
        targetKey: 'id',
        foreignKey: 'userId',
    });
}

export default buildRelations;
