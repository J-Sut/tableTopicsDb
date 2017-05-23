const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {Club} = require('./models');


// ************* Profile Endpoints *************

router.get('/:id', (req, res) => {
	Profile
	.findById(req.params.id)
	.exec()
	.then(profile => res.json(profile))
})













