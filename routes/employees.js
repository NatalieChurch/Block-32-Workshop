import express from "express";
import employees from "#db/employees";


const router = express.Router();


router.get("/", (req, res) => {
  res.send(employees);
});


router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random()*employees.length);
  res.send(employees[randomIndex]);
});


router.get("/:id", (req, res) => {
  const {id} = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (!employee) {
    return res.status(404).send("Employee not found");
  }
  res.send(employee);
});


router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).send("Request body is required");
  }

  const { name } = req.body;
  if (!name || typeof name !== "string") {
    return res.status(400).send("Invalid or missing 'name'");
  }

  const newEmployee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1,
    name,
  };

  employees.push(newEmployee);
  res.status(201).send(newEmployee);
});


export default router;

