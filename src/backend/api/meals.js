import express from "express";
import knex from "../database.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meals").select("title");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

//GET Returns all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex("meals").select("*");
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//POST	Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const newMeal = req.body;
    const result = await knex('meals').insert(newMeal);
    if (result) {
      res.status(201).json({ message: "Meal added successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET	Returns the meal by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getMeal = await knex("meals").select("*").where("id", id).first();
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
    const update = await knex("meals").where("id", id).update(updateMeal);
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
    const deleteMeal = await knex("meals").where("id", id).del();
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
