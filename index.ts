// 3rd Party Imports
import express from 'express';
import path from 'path';
import swaggerAutogen from 'swagger-autogen';
// Leagueify Imports
import api from './api';
// Variable Declarations
const app = express()
const appPort = 8888
const docDetail = {
  info: {
    title: "Leagueify API",
    description: "Bun API Documentation",
    version: "0.0.1"
  },
  host: `localhost`,
}
const docOutputFile = './api/openapi.json'
const docRoutes = ['./index.ts']

// Generate OpenAPI JSON
swaggerAutogen({openapi: '3.0.0'})(docOutputFile, docRoutes, docDetail)

// Serve OpenAPI Docs
app.get('/', (req, res) => {
  // #swagger.ignore = true
  res.sendFile(path.join(import.meta.dir + '/api/index.html'));
})

// Server API
app.use('/api', api)

// Start API Server
app.listen(appPort, () => {
  console.log(`Leagueify Server listening on port: ${appPort}`)
})
