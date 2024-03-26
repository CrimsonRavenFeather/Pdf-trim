const express = require('express');
const router = express.Router()
router.use(express.json());

const connectToMongo=require('../db');
connectToMongo()

const User = require('../schema/user');
const bcrypt = require("bcrypt")

router.post('/', async function(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: "Missing required entries" });
        }

        const { email, password } = req.body; 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({ msg: "success" }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
