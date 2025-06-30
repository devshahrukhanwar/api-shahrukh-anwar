const path = require('path');
const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Portfolio API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for my developer portfolio.',
    },
    servers: [
      {
        url: 'https://api-shahrukhanwar.vercel.app',
        description: 'Production server',
      },
      ...(process.env.APP_ENV === 'local' ? [
        {
          url: 'http://localhost:3000',
          description: 'Local server',
        },
      ] : []),
    ],
  },
  apis: ['./src/routes/api.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  // Serve Swagger UI static files
  app.use('/swagger-static', express.static(path.join(__dirname, '../node_modules/swagger-ui-dist')));

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};
