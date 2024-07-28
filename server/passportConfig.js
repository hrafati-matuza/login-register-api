const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            const query = "SELECT * FROM users WHERE username = ?";
            db.query(query, [username], (err, rows) => {
                if (err) return done(err);
                if (rows.length === 0) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                bcrypt.compare(password, rows[0].password, (err, result) => {
                    if (err) return done(err);
                    if (result === true) {
                        return done(null, rows[0]);
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
            });
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.userId); 
    });

    passport.deserializeUser((id, done) => {
        const query = "SELECT * FROM users WHERE userId = ?";
        db.query(query, [id], (err, rows) => {
            if (err) return done(err);
            if (rows.length === 0) {
                return done(new Error('User not found'));
            }
            const userInfo = {
                id: rows[0].userId,
                username: rows[0].username
            };
            done(null, userInfo);
        });
    });
};
