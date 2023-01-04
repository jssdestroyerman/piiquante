const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const helmet = require("helmet");

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Connection à MongoDB via mongoose avec des variables d'environnement
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}`
  )
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Connexion à MongoDB échouée"));

// app = application express
const app = express();
const port = 3000;

// rateLimit pour empêcher un trop gros nombre de requête par utilisateur.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app
  // helmet pour sécuriser les en-têtes HTTP
  .use(
    helmet({
      crossOriginResourcePolicy: false,
    })
  )
  // Cors middleware pour éviter les erreurs de connexion à l'API
  .use(cors())
  .use(express.json())
  .use(limiter);

// Routes API
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

// écoute de l'application express sur le port 3000
app.listen(port, () => {
  console.log(`Node application started at : http://localhost:${port}`);
});
