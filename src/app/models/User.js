const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            sub: DataTypes.STRING
        },{
            sequelize
        });
    };
};

module.exports = User;