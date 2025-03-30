const { Router } = require('express');
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/',  [ //servicio de crear
    check('name_Producer', 'invalid.name_Producer').not().isEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty().isLength({ min: 5, max: 500}), // la descripcoon debe de tener entre 5 y 500 caracteres
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
    
        let productora = new Productora();
        productora.name_Producer = req.body.name_Producer;
        productora.state = req.body.state;
        productora.createdAt = new Date();
        productora.updatedAt = new Date();
        productora.slogan = req.body.slogan;
        productora.description = req.body.description;



        productora = await productora.save();
        res.send(productora);

    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.get('/', async function(req, res) { //servicio de listar
    try{
        const productoras = await Productora.find(); // select * from users
        res.send(productoras);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
    
});

//UPDATE
router.put('/',  [ //servicio de actualizar
    check('name_Producer', 'invalid.name_Producer').not().isEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty().isLength({ min: 5, max: 500}), // la descripcoon debe de tener entre 5 y 500 caracteres
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }

        let productora = await Productora.findById(req.params.id);
        if (!productora) {
            return res.status(400).send('Director not exist');
        }
        
        productora.name_Producer = req.body.name_Producer;
        productora.state = req.body.state;
        productora.updatedAt = new Date();
        productora.slogan = req.body.slogan;
        productora.description = req.body.description;

        productora = await productora.save();
        res.send(productora);

    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

module.exports = router;