const express = require('express');
const router = express.Router();
const menuItem = require('../models/menuItem');

router.post('/', async(req, res) => {
    try {
        const data = req.body; //assuming the request body contains the person data

        //create a new person document using mongoose
        const newMenuItem = new menuItem(data);


        //save to database
        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });

    }
})

router.get('/', async(req, res) => {
    try {
        const data = await menuItem.find();
        console.log("data fetched");
        res.status(200).json(data);


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });

    }
})

router.get("/:tasteType", async(req, res) => {
    try {
        const tasteType = req.params.tasteType;
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const response = await menuItem.find({ taste: tasteType });
            console.log("data fetched")
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid work type' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }

})

module.exports = router;