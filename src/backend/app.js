import express from "express";
import path from "path";
import mealsRouter from "./api/meals.js";
import reservationsRouter from "./api/reservations.js"
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import knex from "knex";
import { error } from "console";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = express.Router();

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;


// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

app.use("/api/meals", mealsRouter);
app.use("/api/reservations", reservationsRouter)

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

// Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  try {
    const futureMeals = await knex("Meal")
      .select()
      .where("when", ">", new Date());
    if (futureMeals.length === 0) {
      res.status(404).send("The future meals is empty");
      return;
    }
    res.status(200).json(futureMeals);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
});

// Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try {
    const date = new Date();
    const pastMeals = await knex("Meal").select().where("when", "<", date);
    res.status(200).json(pastMeals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

//Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const allMeals = await knex("Meal").select().orderBy("id");
    res.status(200).json(allMeals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

//	Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async (req, res) => {
  try {
    const firstMeal = await knex("Meal").select().orderBy("id").first();

    res.status(200).json(firstMeal);

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

//	Respond with the last meal (meaning with the maximum id)
app.get("/last-meal", async (req, res) => {
  try {

    const lastMeal = await knex("Meal").select().orderBy("id", "desc").first();
    res.status(200).json(lastMeal);

  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

export default app;
