import Sequelize, { BelongsToManyAddAssociationMixin, CreationOptional } from 'sequelize'
import User from './user'

class Cover extends Sequelize.Model {
    declare id: CreationOptional<number>
    declare makeCover: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    
    static initiate(sequelize: Sequelize.Sequelize) {
      Cover.init({
        makeCover: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
      }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Cover',
        tableName: 'covers',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    

      }
      static associate() {
        Cover.belongsTo(User);
        }
      }


export default Cover