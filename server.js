const express=require('express');
const app=express();
const port=3000;
const path=require('path');
const fs=require('fs');
const mongoose=require('mongoose');

const cors = require('cors');
const BudgetModel = require("./models/budget");

app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));

mongoose.connect("mongodb://localhost:27017/personal-budget", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB!!"))
  .catch(err => console.error("MongoDB Connection Error: ", err));

app.get('/hello', (req, res) => {
    res.send('Hello World!')
});

app.get("/api/budget", async (req, res) => {
    try {
        const budgetData = await BudgetModel.find();
        res.json({ myBudget: budgetData });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

app.post("/api/budget", async (req, res) => {
    try {
        const { title, budget, color } = req.body;
        if (!title || !budget || !color) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newBudget = new BudgetModel({ title, budget, color });
        await newBudget.save();

        res.status(201).json({ message: "Budget item added", budget: newBudget });
    } catch (err) {
        res.status(500).json({ error: "Failed to add budget item" });
    }
});


app.get("/budget",(req,res)=>{
    res.json(budgetData);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});