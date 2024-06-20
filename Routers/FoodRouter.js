const exporess = require("express");
const {
  createPizza,
  getPizza,
  getPizzas,
  deletePizza,
  updatePizza,
} = require("../Controllers/PizzaController");
const { AuthMiddleware } = require("../Middleware/AuthMiddleware");

router = exporess.Router();

router.get("/getPizzas", getPizzas);
router.get("/getPizza/:id", getPizza);
router.post("/createPizza", AuthMiddleware, createPizza);
router.delete("/deletePizza/:id", AuthMiddleware, deletePizza);
router.put("/updatePizza/:id", AuthMiddleware, updatePizza);

module.exports = router;
