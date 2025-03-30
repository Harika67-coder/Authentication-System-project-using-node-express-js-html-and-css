const express = require("express");
const bcrypt=require('bcryptjs');
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();

// Register User
router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        User.create(email, password, (err) => {
            if (err) {
                return res.status(400).json({ message: "User already exists" });
            }
            return res.json({ message: "User registered successfully!" });
        });
    }
);

// Login User
router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password").not().isEmpty().withMessage("Password is required"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        User.findByEmail(email, async (err, user) => {
            if (err) {
                return res.status(500).json({ message: "Database error" });
            }

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            return res.json({ message: "Login successful!" });
        });
    }
);

module.exports = router;
