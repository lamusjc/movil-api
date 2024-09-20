'use strict';

const express = require('express');
var router = express.Router();

//Endpoints de usuario
router.post('/register', require('./register.js'));
router.post('/login', require('./login.js'));
router.get('/info', require('./info.js'));
router.get('/logout', require('./logout.js'));

//Endpoints de notas
router.post('/note', require('./create_note.js'));
router.get('/note', require('./get_note.js'));
router.put('/note', require('./update_note.js'));
router.delete('/note/:note_id', require('./delete_note.js'));
router.post('/updatePosition', require('./update_position.js'));

module.exports = router;