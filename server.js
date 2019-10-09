const express = require('express');
const connectDB = require('./config/db');
const jsYaml = require('js-yaml');
const fs = require('fs');
const { OpenApiValidator } = require('express-openapi-validate');
const app = express();

// OpenAPI functionality
const openApiDocument = jsYaml.safeLoad(
  fs.readFileSync('./spec/api.yaml', 'utf-8')
);

const validator = new OpenApiValidator({ apiSpec: './spec/api.yaml' }).install(
  app
);

// Connect Database;
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false,
  })
);

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/spec', express.static(spec));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/company', require('./routes/api/company'));
app.use('/api/employee', require('./routes/api/employee'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

module.exports = server;
