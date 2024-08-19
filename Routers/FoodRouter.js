const exporess = require("express");
const {
  createPizza,
  getPizza,
  getPizzas,
  deletePizza,
  updatePizza,
  categoryPizza,
  favoritePizza,
  locationPizza,
} = require("../Controllers/PizzaController");
const protect = require("../Middleware/AuthMiddleware");

router = exporess.Router();

router.get("/get-pizza", getPizzas);
router.get("/getPizza/:id", getPizza);
router.post("/addFood", protect, createPizza);
router.delete("/deletePizza/:id", protect, deletePizza);
router.put("/updatePizza/:id", protect, updatePizza);
router.get("/getAllFood", categoryPizza);
router.get("/favoritepizza", favoritePizza);
router.post("/location", locationPizza);
module.exports = router;
