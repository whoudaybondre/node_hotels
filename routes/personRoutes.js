const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const { jwtAuthMidlleware, generateToken } = require('./../jwt');

router.get("/:workType", async(req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await person.find({ work: workType });
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

router.post('/signup', async(req, res) => {
    try {
        const data = req.body; //assuming the request body contains the person data

        //create a new person document using mongoose
        const newPerson = new person(data);
        // newPerson.name = data.name;
        // newPerson.age = data.age;
        // newPerson.work = data.work;
        // newPerson.mobile = data.mobile;
        // newPerson.email = data.email;
        // newPerson.address = data.address;
        // newPerson.salary = data.salary;

        //save to database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));

        const token = generateToken(payload);
        console.log('token saved :', token);

        res.status(200).json({ response: response, token: token });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });

    }
})

//login route
router.post('/login', async(req, res) => {
    try {
        //extract the username and password
        const { username, password } = req.body;
        // console.log(username);
        // console.log(password);

        //find user by username
        const user = await person.findOne({ username: username });

        //if user not found and password is wrong
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'invalid username and password' });
        }

        //gnerate token
        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);

        //return token as response
        res.json({ token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})



router.get('/', async(req, res) => {
    try {
        const data = await person.find();
        console.log("data fetched");
        res.status(200).json(data);


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });

    }
})

router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true
        });
        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        console.log("data updated");
        res.status(200).json(response);


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id;

        const response = await person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }
        console.log("data deleted");
        res.status(200).json({ message: 'person data deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

module.exports = router;