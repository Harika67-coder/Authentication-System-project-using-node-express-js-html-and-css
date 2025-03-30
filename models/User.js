const db = require("../database");
const bcrypt = require("bcryptjs");

const User = {
    create: async (email, password, callback) => {
        // Check if user already exists
        User.findByEmail(email, async (err, user) => {
            if (user) {
                return callback(new Error("User already exists"));
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], callback);
        });
    },

    findByEmail: (email, callback) => {
        db.get("SELECT * FROM users WHERE email = ?", [email], callback);
    },
};

module.exports = User;
