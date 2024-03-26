const express = require('express');
const router = express.Router()
router.use(express.json());

const connectToMongo=require('../db');
connectToMongo()

const User = require('../schema/user');
const bcrypt = require("bcrypt")
const saltRounds = 10

router.post('/',async function(req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: "Missing required entries" });
        }
        const { email, password } = req.body; 
        const user = await User.findOne({ email });
        console.log(email,password)
        if (user) {
            return res.status(409).json({ error: "Email is already present" });
        }

        const salt = await bcrypt.genSalt(saltRounds)
        const encyPassword =await bcrypt.hash(password,salt)

        const NewUser = new User({
            email:email,
            password:encyPassword
        })
        NewUser.save()
        res.status(200).json({msg: "sucess"}); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
