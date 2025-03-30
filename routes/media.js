const { Router } = require('express');
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/',  [ //servicio de crear
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url_pelicula', 'invalid.url_pelicula').not().isEmpty(),
    check('image', 'invalid.image').not().isEmpty(),
    check('anio_estreno', 'invalid.anio_estreno').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),
    
    
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
    
        const serialExist = await Media.findOne({ serial: req.body.serial });
        if (serialExist){
            return res.status(400).send('Exist serial');
        }

        const urlExist = await Media.findOne({ url_pelicula: req.body.url_pelicula });
        if (urlExist){
            return res.status(400).send('Exist url_pelicula');
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url_pelicula = req.body.url_pelicula;
        media.image = req.body.image;
        media.createdAt = new Date();
        media.updatedAt = new Date();
        media.anio_estreno = req.body.anio_estreno;
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;
        
        media = await media.save();
        res.send(media);

    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.get('/', async function(req, res) { //servicio de listar
    try{
        const medias = await Media.find().populate([
            {
                path: 'genero', select: 'name state'
            },
            {
                path: 'director', select: 'name state'
            },
            {
                path: 'productora', select: 'name_Producer'
            },
            {
                path: 'tipo', select: 'name'
            },
        ]) 
        res.send(medias);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
    
});

//UPDATE
router.put('/',  [ //servicio de actualizar
    check('serial', 'invalid.serial').not().isEmpty(),
    check('titulo', 'invalid.titulo').not().isEmpty(),
    check('sinopsis', 'invalid.sinopsis').not().isEmpty(),
    check('url_pelicula', 'invalid.url_pelicula').not().isEmpty(),
    check('image', 'invalid.image').not().isEmpty(),
    check('anio_estreno', 'invalid.anio_estreno').not().isEmpty(),
    check('genero', 'invalid.genero').not().isEmpty(),
    check('director', 'invalid.director').not().isEmpty(),
    check('productora', 'invalid.productora').not().isEmpty(),
    check('tipo', 'invalid.tipo').not().isEmpty(),
    
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
    
        const serialExist = await Media.findOne({ serial: req.body.serial });
        if (!serialExist) {
        return res.status(400).send('Exist serial ');
        }

        let media = await Media.findOne({ serial: req.body.serial });
        if (!media) {
            return res.status(400).send('Media not exist');
        }

        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url_pelicula = req.body.url_pelicula;
        media.image = req.body.image;
        media.updatedAt = new Date();
        media.anio_estreno = req.body.anio_estreno;
        media.genero = req.body.genero._id;
        media.director = req.body.director._id;
        media.productora = req.body.productora._id;
        media.tipo = req.body.tipo._id;
        
        media = await media.save();
        res.send(media);

    
    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.get('/:mediaId', async function (req, res) {
    try{
        const media = await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(404).send('No exist media');
        }
        res.send(media);
    }catch(error) {
        console.log(error);
        res.status(500).send('mesage error');
    }
    
});


module.exports = router;