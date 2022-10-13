const { Router } = require('express');
const axios = require('axios');
const { Race, Temperament } = require('../db');
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
    return await Race.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllRaces = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        let racesTotal = await getAllRaces();
        if (name) {
            let racesFilteredByName = await racesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            racesFilteredByName.length ?
            res.status(200).send(racesFilteredByName) :
            res.status(404).send('ERROR. La raza buscada no existe')
        } else {
            res.status(200).send(racesTotal);
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get('/:raceId', async (req, res) => {
    const { raceId } = req.params;
    try {
        const racesTotal = await getAllRaces();
        const racesFilteredById = await racesTotal.filter(el => el.id == raceId);
        racesFilteredById.length ?
        res.status(200).send(racesFilteredById) :
        res.status(404).send("ERROR. Invalid ID");
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
            const createdRace = await Race.create(req.body);

            temperaments.forEach(async temper => {
                let temperDb = await Temperament.findAll({
                    where: { name: temper }
                })
                createdRace.addTemperament(temperDb)
            })
            
            res.status(201).send("Raza creada con exito");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;
