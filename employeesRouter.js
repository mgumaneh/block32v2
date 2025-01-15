const express = require("express");
const router = express.Router();
const employees = require("./employees"); // Import the employees data

// GET /employees - Fetch all employees
router.get("/", (req, res) => {
  res.json(employees);
});

// GET /employees/random - Fetch a random employee
router.get("/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

// GET /employees/:id - Fetch an employee by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

// POST /employees - Add a new employee
router.post("/", (req, res) => {
  const { name } = req.body;

  // Validate name
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "Name is required and must be a valid string" });
  }

  // Generate a unique ID
  const maxId = employees.reduce((max, emp) => Math.max(max, emp.id), 0);
  const newEmployee = { id: maxId + 1, name };

  // Add the new employee
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

module.exports = router; // Export the router