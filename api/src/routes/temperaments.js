const { Router } = require('express');
const axios = require('axios');
const { Temperament } = require('../db');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// 'api_key=live_dZ1w9VWsQnDZcNqqVUWYB5WVw5Wh6w3lGgzRcEDK3cD0tZ7G5QdwaLGADSxl1Gt5'

const cargarDatos = async () => {
    const temperamentsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
    const temperaments = temperamentsApi.data.map(el => el.temperament);
    const tempersEach = temperaments.map(t => t === undefined ? [] : t.split(', ')).join().split(',').filter(el => el !== '');
    tempersEach.forEach(el => {
        Temperament.findOrCreate({
            where: { name: el }
        });
    });
}

//cargarDatos();

router.get('/', async (req, res) => {
    try {
        const allTemperaments = await Temperament.findAll();
        res.status(200).send(allTemperaments);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

module.exports = router;
