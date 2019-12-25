module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Shopping', {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });
};