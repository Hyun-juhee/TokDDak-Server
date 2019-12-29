module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TripHotel', {
        level: {
            type: DataTypes.STRING(30),
            allowNull : false,
        },
        cost : { // 비용
            type: DataTypes.INTEGER,
            allowNull : false,
        },

    }, {
        freezeTableName: true,
        timestamps: false,
    });
};