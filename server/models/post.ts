import Sequelize, { BelongsToManyAddAssociationMixin, CreationOptional } from 'sequelize'
import User from './user'

class Post extends Sequelize.Model {
    declare id: CreationOptional<number>
    declare content: string
    declare makeContent: string
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    
    static initiate(sequelize: Sequelize.Sequelize) {
      Post.init({
        content: {
          type: Sequelize.STRING(700),
          allowNull: true,
        },
        makeContent: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      }, {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Post',
        tableName: 'posts',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      });
    

      }
      static associate() {
          Post.belongsTo(User);
              // as, foreignkey 미작성은 햇갈릴 염려 없어서 생략 가능
        }
      }


export default Post