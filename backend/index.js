const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const cors = require("cors")


mongoose.connect("mongodb+srv://jssdestroyerman:Monmotdepasse@occursefullstacknodejse.qnnkqu4.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch(() => console.log("Connexion à MongoDB échouée"))



const app = express()
const port = 3000

app
    .use(cors())
    .use(express.json())


app.use("/api/auth", userRoutes)



app.listen(port, () => {
    console.log(`Node application started at : http://localhost:${3000}`);
})

