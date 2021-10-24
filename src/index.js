const express = require('express');
const dbConnect = require('./configs/database');

const { PORT } = require('./utils/constants');

const app = express();

require('./configs/express')(app);
require('./configs/handlebars')(app);

dbConnect()
    .then(() => console.log('Database is connected!'))
    .then(() => app.listen(PORT, console.log.bind(console, `Server is running on http://localhost:${PORT}`)))
    .catch(err => console.error(err));
