import express from "express";
const router = express.Router();
import knex from "../database.js";

router.get("/", async (req, res) => {
  try {
    const reviews = await knex("review").select();
    res.json(reviews);
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newReview = req.body;
    const [reviewId] = await knex("review").insert(newReview);
    res.status(201).json({ id: reviewId });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  console.log('req', req.params.id);
  try {
    const reviewId = req.params.id;
    const review = await knex("review").where("id", "=", reviewId).select();

    if (review.length === 0) {
      res.status(404).send("Review not found");
      return;
    }
    res.json({ review });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const updateReview = req.body;
    const review = await knex("review")
      .where("id", "=", reviewId)
      .update(updateReview);

    if (review.length === 0) {
      res.status(404).send("Review not found");
      return;
    }
    res.status(200).json({ review });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const reviews = await knex("review").where("id", "=", reviewId).del();
    if (reviews === 0) {
      res.status(404).send("Review not found");
      return;
    }
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

export default router;
