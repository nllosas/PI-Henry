const { Router } = require('express');
const axios = require('axios');
const { Breed, Temperament } = require('../db');
const router = Router();

// 'api_key=live_dZ1w9VWsQnDZcNqqVUWYB5WVw5Wh6w3lGgzRcEDK3cD0tZ7G5QdwaLGADSxl1Gt5'
// https://api.thedogapi.com/v1/breeds
// https://api.thedogapi.com/v1/breeds/search?q={raza_perro} --> ej: https://api.thedogapi.com/v1/breeds/search?q=American%20Bulldog

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            min_weight: el.weight.metric.split(' - ')[0],
            max_weight: el.weight.metric.split(' - ')[1],
            min_height: el.height.metric.split(' - ')[0],
            max_height: el.height.metric.split(' - ')[1],
            min_life_span: el.life_span.slice(0,-6).split(' - ')[0],
            max_life_span: el.life_span.slice(0,-6).split(' - ')[1],
            temperaments: el.temperament ? el.temperament.split(', ').map(el => {return {name: el}}) : [],
            img: el.image.url
        };
    });
    return apiInfo
};

const getDbInfo = async () => {
    return await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllBreeds = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        let breedsTotal = await getAllBreeds();
        if (name) {
            let breedsFilteredByName = await breedsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            breedsFilteredByName.length ?
            res.status(200).send(breedsFilteredByName) :
            res.status(404).send('ERROR. La raza buscada no existe')
        } else {
            res.status(200).send(breedsTotal);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get('/:breedId', async (req, res) => {
    const { breedId } = req.params;
    try {
        const breedsTotal = await getAllBreeds();
        const breedsFilteredById = await breedsTotal.filter(el => el.id == breedId);
        breedsFilteredById.length ?
        res.status(200).send(breedsFilteredById) :
        res.status(404).send("ERROR. ID Invalido");
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post('/', async (req, res) => {
    const { name, min_height, max_height, min_weight, max_weight, temperaments } = req.body;
    try {
        if (!name || !min_height || !max_height || !min_weight || !max_weight) throw new Error("ERROR. Faltan datos obligatorios");
        else {
            console.log(req.body);
            const createdBreed = await Breed.create(req.body);

            temperaments.forEach(async temper => {
                let temperDb = await Temperament.findAll({
                    where: { name: temper }
                })
                createdBreed.addTemperament(temperDb)
            })
            
            res.status(201).send("Raza creada con exito");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;
