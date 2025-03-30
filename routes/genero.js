const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/generoId',  [ //servicio de crear
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('description', 'invalid.description').not().isEmpty().isLength({ min: 5, max: 500}), // la descripcoon debe de tener entre 5 y 500 caracteres
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
    
        let genero = new Genero();
        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.createdAt = new Date();
        genero.updatedAt = new Date();
        genero.description = req.body.description;

        genero = await genero.save();
        res.send(genero);

    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.get('/generoId', async function(req, res) { //servicio de listar
    try{
        const generos = await Genero.find(); // select * from users
        res.send(generos);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
    
});

//UPDATE
router.put('/:generoId',  [ //servicio de actualizar
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('description', 'invalid.description').not().isEmpty().isLength({ min: 5, max: 500}), // la descripcoon debe de tener entre 5 y 500 caracteres
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }

        let genero = await Genero.findById(req.params.id);
        if (!genero) {
            return res.status(400).send('Genero not exist');
        }
            
        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.updatedAt = new Date();
        genero.description = req.body.description;

        genero = await genero.save();
        res.send(genero);

    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.get('/:mediaId', async function (req, res) {
    try{
        const media = await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(404).send('No exist Media');
        }
        res.send(media);
    }catch(error) {
        console.log(error);
        res.status(500).send('message error');
    }
    
});

module.exports = router;