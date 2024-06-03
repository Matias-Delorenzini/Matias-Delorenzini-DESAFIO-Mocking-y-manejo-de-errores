import express from 'express';
import passport from 'passport';
import { usersService } from './../repositories/index.js';
const router = express.Router();

router.get("/current", (req, res) => {
    try {
        if (req.session.user) {
            res.status(200).json({ user: req.session.user });
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/register", passport.authenticate("register", { failureRedirect: "/api/sessions/failregister" }), async (req, res) => {
    try {
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/failregister", async (req, res) => {
    try {
        console.log("Failed Strategy");
        res.redirect("/register");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/faillogin" }), async (req, res) => {
    try {
        if (!req.user) return res.status(400).send({ status: "error", error: "Invalid credentials" });

        req.session.user = await usersService.createUserSession(req.user);

        res.redirect("/api/products");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/faillogin", (req, res) => {
    try {
        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post("/logout", (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.log("Error al hacer logout", err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.redirect("/login");
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
