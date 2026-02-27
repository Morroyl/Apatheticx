const express = require('express');
const db = require('../models/db');
const router = express.Router();

// Получить список всех складов
router.get('/', async (req, res) => {
    try {
        const warehouses = await db.query('SELECT * FROM Warehouses ORDER BY category, name');
        res.json(warehouses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;