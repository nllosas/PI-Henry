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
            weight: el.weight,
            height: el.height,
            life_span: el.life_span,
            temperament: el.temperament,
            img: el.image
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

// const postRace = async (raceInfo) => {
//     return await Race.create(raceInfo);
// }

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
        const racesFilteredById = await racesTotal.filter(el => el.id === Number(raceId));
        racesFilteredById.length ?
        res.status(200).send(racesFilteredById) :
        res.status(404).send("ERROR. Invalid ID");
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.post('/', async (req, res) => {
    const { name, height, weight, temperaments } = req.body;
    try {
        if (!name || !height || !weight) throw new Error("ERROR. Faltan datos obligatorios");
        else {
            const createdRace = await Race.create(req.body);

            temperaments.forEach(async temper => {
                let temperDb = await Temperament.findAll({
                    where: { name: temper}
                })
                createdRace.addTemperament(temperDb)
            })
            
            res.status(201).send("Personaje creado con exito");
        }
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;
