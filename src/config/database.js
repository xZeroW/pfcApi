module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'root',
    database: 'pfc',
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};
