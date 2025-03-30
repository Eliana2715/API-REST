const { Router } = require('express');
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/',  [ //servicio de crear
    check('name', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty().isLength({ min: 5, max: 500}), // la descripcoon debe de tener entre 5 y 500 caracteres
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
    
        let tipo = new Tipo();
        tipo.name = req.body.name;
        tipo.createdAt = new Date();
        tipo.updatedAt = new Date();
        tipo.description = req.body.description;



        tipo = await tipo.save();
        res.send(tipo);

    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.get('/', async function(req, res) { //servicio de listar
    try{
        const tipos = await Tipo.find(); // select * from users
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
    
});

//UPDATE
router.put('/:tipo_id',  [ //servicio de actualizar
    check('name', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty().isLength({ min: 5, max: 500}), // la descripcoon debe de tener entre 5 y 500 caracteres
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
    
        let tipo = await Tipo.findById(req.params._id);
        if (!tipo) {
            return res.status(400).send('Tipo not exist');
        }

        tipo.name = req.body.name;
        tipo.updatedAt = new Date();
        tipo.description = req.body.description;

        tipo = await tipo.save();
        res.send(tipo);

    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

module.exports = router;