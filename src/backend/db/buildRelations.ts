import RefreshToken from 'backend/models/RefreshToken';
import User from 'backend/models/User';

function buildRelations() {
    User.hasOne(RefreshToken, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
}

export default buildRelations;
