module.exports = {
  cookie: {
    secret: 'Wxdf3_2Pmzrxfa'
  },
  database: {
    db: 'blipay',
    username: 'root',
    password: 'chibaheit',
    dialect: 'mysql',
    host: 'localhost',
    pool: {
      min: 0,
      max: 10,
      idle: 1000
    }
  },
  upload: './upload'
};
