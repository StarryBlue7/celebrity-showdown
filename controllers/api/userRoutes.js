const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


// api/users routes

// Create a new User
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.username;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        // Locate record in User table using the email value
        const userData = await User.findOne({ where: { email: req.body.email } });
        // If no matching record in user table, throw error
        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        // Compare password input value to password value in table record
        const validPassword = await userData.checkPassword(req.body.password);
        // password input doesn't match value in table, throw error
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // create a session for this user
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.user_name = userData.name;
            req.session.logged_in = true;
            
            res.json({ user: userData.name, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update user win count
router.put('/:id', withAuth, async (req, res) => {
    if (req.body.isWin) {
        try {
            const userData = await User.findOne({ where: { id: req.params.id } });
            if (!userData) {
                res.status(400).json({ message: 'User not found!' });
                return;
            }
            
            const winAdded =  await userData.update(
                { win_count: userData.dataValues.win_count + 1 },
            )
            if (!winAdded) {
                res.status(400).json({ message: 'Could not add win' });
                return;
            } else {
                res.status(200).json({ message: 'Win added!' })
            }
        } catch (err) {
            res.status(400).json(err);
        }
    } else {
        res.status(200).json({ message: 'No win to add. Better luck next time!'})
    }
});

// User logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;