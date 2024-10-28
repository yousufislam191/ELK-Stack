const express = require('express');
const router = express.Router();
const logger = require('../config/logger');

// Simulate a user database
const users = new Map();

router.post('/users', (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            logger.warn('Invalid user data received', { username, email });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        users.set(username, { username, email });

        logger.info('User created successfully', { username, email });
        res.status(201).json({ message: 'User created', username });
    } catch (error) {
        logger.error('Error creating user', { error: error.message, stack: error.stack });
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/users/:username', (req, res) => {
    try {
        const { username } = req.params;
        const user = users.get(username);

        if (!user) {
            logger.warn('User not found', { username });
            return res.status(404).json({ error: 'User not found' });
        }

        logger.info('User retrieved successfully', { username });
        res.json(user);
    } catch (error) {
        logger.error('Error retrieving user', { error: error.message, stack: error.stack });
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;