
import express from "express";
import knex from "../database.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const {
    maxPrice,
    availableReservations,
    title,
    dateAfter,
    dateBefore,
    limit,
    sortKey,
    sortDir,
  } = req.query;

  try {
    const meals = await knex("meal")
      .select(" * ")
      .countDistinct("reservation.id as total_reservations")
      .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
      .groupBy("meal.id", "meal.title", "meal.max_reservations", "meal.price", "meal.when");
    
    if (maxPrice !== undefined) {
      const price = parseFloat(maxPrice);
   
      if (!isNaN(price) && price >= 0) {
        query.where("Meal.price", "<=", price);
      } else {
        res.status(400).send("Invalid maxPrice");
        return;
      }
    }
      
       if (availableReservations === "true") {
         query.having(
           "total_reservations",
           "<",
           knex.raw("meal.max_reservations")
         );
       } else if (availableReservations === "false") {
         query.having(
           "total_reservations",
           ">=",
           knex.raw("meal.max_reservations")
         );
       }
    
     if (title !== undefined) {
       query.where("meal.title", "like", `%${title}%`);
     }

     if (dateAfter !== undefined) {
       query.where("meal.when", ">", dateAfter);
     }

     if (dateBefore !== undefined) {
       query.where("meal.when", "<", dateBefore);
     }

     if (limit !== undefined) {
       query.limit(parseInt(limit, 10));
     }
    
    
    if (sortKey !== undefined) {
      const direction = sortDir === "desc" ? "desc" : "asc";
      query.orderBy(`Meal.${sortKey}`, direction);
    }

    const result = await query;

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//POST	Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const newMeal = req.body;
    const result = await knex("meal").insert(newMeal);
    if (result) {
      res.status(201).json({ message: "Meal added successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET	Returns the meal by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
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

