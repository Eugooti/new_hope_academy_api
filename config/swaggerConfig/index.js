const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School Management System API',
            version: '1.0.0',
            description: 'API documentation for the School Management System',
        },
        servers: [
            {
                url: 'http://localhost:4600/nha',
            },
        ],
    },
    apis: [path.join(__dirname, '../../routes/*.js')], // path of the routes
};

const specs = swaggerJsdoc(options);

const swaggerDocs = {
    specs,
    ui: swaggerUi.serve,
    setup: swaggerUi.setup(specs),
};

module.exports = { swaggerDocs };
