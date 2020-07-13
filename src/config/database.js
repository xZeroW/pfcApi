module.exports = {
    dialect: 'postgres',
    host: process.env.db_host,
    username: process.env.db_user,
    password: process.env.db_pass,
    database: process.env.db,
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};
