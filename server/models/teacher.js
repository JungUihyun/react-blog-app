module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'teacher', // 테이블의 이름을 지정합니다
        {
            name: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8general_ci',
            timestamps: false,
        }
    )
};