const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3001;
require('dotenv').config();

// MIDDLEWARE__####################################################################
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());

require('./passportConfig')(passport);

// ################################################################################
// REQUEST_HANDLERS################################################################
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        const query = 'SELECT username FROM users WHERE username = ?';
        db.query(query, [username], async (err, result) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send('Internal server error');
            }

            if (result.length > 0) {
                return res.status(400).send('Username already taken');
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(insertQuery, [username, encryptedPassword], (err, result) => {
                if (err) {
                    console.error('Database insert error:', err);
                    return res.status(500).send('Internal server error');
                }
                res.status(200).send('User Registered');
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { 
        if (err) {
            console.log(err);
            return res.status(500).send('Internal server error');
        }
        if (!user) {
            return res.status(400).send('User not found');
        }
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Internal server error');
            }
            res.send("User logged in");
            console.log(user);
        });
    })(req, res, next);
});

app.get('/getUser', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.status(401).send('User not authenticated');
    }
});

app.get('/test-db-connection', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, results) => {
        if (err) {
            console.error('Database connection error', err);
            return res.status(500).send('Database connection error');
        }
        res.send(`Database connection successful: ${results[0].solution}`);
    });
});

app.get('/', (req, res) => {
    res.send("Hello world"); 
});
  
// ################################################################################
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
