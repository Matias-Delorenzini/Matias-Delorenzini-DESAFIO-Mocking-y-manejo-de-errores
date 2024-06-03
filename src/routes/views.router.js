import express from 'express';
const router = express.Router();

function privateRouteAuth(req, res, next) {
    try {
        if (req.session.user) {
            res.redirect("/profile");
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function publicRouteAuth(req, res, next) {
    try {
        if (!req.session || !req.session.user) {
            res.redirect("/login");
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

router.get("/register", privateRouteAuth, (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/login", privateRouteAuth, (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/profile", publicRouteAuth, (req, res) => {
    try {
        const userData = req.session.user;
        res.render('profile', { userData });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
