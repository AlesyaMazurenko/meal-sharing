import express from "express";
import knex from "../database.js";

const router = express.Router();

//GET Returns all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await knex.select("*").from("reservation");
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//POST	Adds a new meal to the reservations
router.post("/", async (req, res) => {
  try {
    const newReserv = req.body;
    const result = await knex("reservation").insert(newReserv);
    if (result) {
      res.status(201).json({ message: "Meal added successfully" });
    }
  } catch (error) {
      console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET	Returns the reservation by id
router.get("/:id", async (req, res) => {
    console.log('req', req);
  try {
    const id = req.params.id;
      const getReserev = await knex.select("*").from("reservation").where("id", id).first();
    if (getReserev) {
      res.json(getReserev);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT	Updates the reservation by id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateReserv = req.body;
    const update = await knex("reservation").where("id", id).update(updateReserv);
    if (update) {
      res.json({ message: "update reservation" });
    } else {
      res.status(404).json({ message: "reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// DELETE	Deletes the reservation by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteReserv = await knex("reservation").where("id", id).del();
    if (deleteReserv) {
      res.json({ message: "Reservation deleted successfully" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

export default router;