import Sequelize, { BelongsToManyAddAssociationMixin, CreationOptional, DataTypes } from 'sequelize';
import Post from './post';
import Cover from './cover';

class User extends Sequelize.Model {
    declare id: CreationOptional<number>;
    declare email: string;
    declare nick: string;
    declare password: string;
    declare provider: string;
    declare snsId: string;
    declare accessToken: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date>;

    static initiate(sequelize: Sequelize.Sequelize) {
        User.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao', 'naver'),
                allowNull: false,
                defaultValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: true, // 카카오 API를 통해 제공되는 값이 없을 수도 있기 때문에 true로 설정
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate() {
        User.hasMany(Post);
        User.hasMany(Cover);
    }
};

export default User;
