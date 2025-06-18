const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Flight Booking App API',
      version: '1.0.0',
      description: 'API documentation for the Flight Booking App backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      // Add your Render URL here after deployment
    ],
  },
  apis: ['./routes/*.js'], // Path to your route files for auto doc generation
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;