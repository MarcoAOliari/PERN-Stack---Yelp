require("dotenv").config()
const express = require("express")
const cors = require("cors")
const db = require("./db")

const morgan = require("morgan")
const { query } = require("express")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM restaurants")  

        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
    
})

app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id])
        
        res.status(200).json({
            status: "success",
            data: {
                restaurant: result.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", 
            [req.body.name, req.body.location, req.body.price_range]
        )

        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query(
            "UPDATE restaurants SET name = $2, location = $3, price_range = $4 WHERE id = $1 returning *",
            [req.params.id, req.body.name, req.body.location, req.body.price_range])

            res.status(200).json({
                status: "success",
                data: {
                    restaurant: result.rows[0]
                }
            })
    } catch (err) {
        console.log(err)
    }
})

app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query(
            "DELETE FROM restaurants WHERE id = $1",
            [req.params.id])

        res.status(204).json({
            status: "success",
        })
    } catch (err) {
        console.log(err)
    }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`)
})