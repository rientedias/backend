/**
 * ROTAS
 * Configurações de rotas.
 */

const express = require('express');

/**
 * Controlles
 */
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/PorfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * METHOD HTTP
 */

/**
 * GET
 */

routes.get('/ongs', OngController.list);

routes.get('/incidents', IncidentController.list);

routes.get('/profile', ProfileController.index);

/**
 * POST
 */

routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);

routes.post('/sessions', SessionController.create)

/**
 * PUT
 */

/**
 * DELETE
 */

routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes; 