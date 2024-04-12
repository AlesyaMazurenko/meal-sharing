import express from "express";
import knex from "../database.js";

const router = express.Router();


router.get("/", async (req, res) => {
  // console.log('req', req.query.id);
  try {
    const meals = await knex("meal").select(" * ");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
// { 
//         "title": "Varenyky",
//         "description": "Varenyky",
//         "location": "Aarhus",
//         "when": "2024-01-19T11:45:00.000Z",
//         "max_reservations": "100",
//         "price": "20",
//         "created_date": "2022-11-06T23:00:00.000Z"
// }
//POST	Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const newMeal = req.body;
    console.log('req/', newMeal);
    const result = await knex("meal").insert(newMeal);
    console.log('res', result);
    if (result) {
      res.status(201).json({ message: "Meal added successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET	Returns the meal by id
router.get("/:id", async (req, res) => {
   console.log("params");
  const id = req.query.id;
   console.log("params", id);
  try {
    const getMeal = await knex("meal").select("*").where("id", id);
    
    if (getMeal) {
      res.json(getMeal);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT	Updates the meal by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateMeal = req.body;
    const update = await knex("meal").where("id", id).update(updateMeal);
    if (update) {
      res.json({ message: "update meal" });
    } else {
      res.status(404).json({ message: "meal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE	Deletes the meal by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteMeal = await knex("meal").where("id", id).del();
    if (deleteMeal) {
      res.json({ message: "Meal deleted successfully" });
    } else {
      res.status(404).json({ message: "meal not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;
