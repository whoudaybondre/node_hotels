const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');

//password authentication
passport.use(new LocalStrategy(async(USERNAME, PASSWORD, done) => {
    //authentication logic
    try {
        // console.log('Recevied credentials:', USERNAME, PASSWORD);
        const user = await person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });

        const isPaswwordMatch = await user.comparePassword(PASSWORD);
        if (isPaswwordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect message.' });
        }
    } catch (err) {
        return done(err);
    }
}))

module.exports = passport; //export configure password