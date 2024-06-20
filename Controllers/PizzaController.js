const Pizza = require("../Models/Pizza");
const dotenv = require("dotenv");
dotenv.config();

const createPizza = async (req, res) => {
  try {
    const {
      name,
      ingredients,
      price,
      image,
      description,
      smallPrice,
      mediumPrice,
      largePrice,
    } = req.body;
    const newPizza = new Pizza({
      name,
      ingredients,
      price,
      image,
      description,
      smallPrice,
      mediumPrice,
      largePrice,
    });
    const pizza = await newPizza.save();
    return res
      .status(200)
      .json({ message: "Pizza oluşturuldu", pizza, success: true });
  } catch (error) {
    console.log("🚀 ~ createPizza ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPizza = async (req, res) => {
  const { id } = req.params;
  try {
    const pizza = await Pizza.findById(id);
    if (!pizza) {
      return res
        .status(404)
        .json({ message: "Pizza bulunamadı", success: false });
    }
    if (pizza === null) {
      return res
        .status(404)
        .json({ message: "Pizza bulunamadı", success: false });
    }
    return res.status(200).json({ pizza, success: true });
  } catch (error) {
    console.log("🚀 ~ getPizza ~ error:", error);
    res.status(500).json({ message: "Pizza id servisinde hata" });
  }
};

const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    if (!pizzas) {
      return res
        .status(404)
        .json({ message: "Pizza bulunamadı", success: false });
    }
    return res
      .status(200)
      .json({ pizzas, success: true, message: "Pizzalar getirildi" });
  } catch (error) {
    console.log("🚀 ~ getPizzas ~ error:", error);
    res.status(500).json({ message: "getPizzas hata" });
  }
};

const deletePizza = async (req, res) => {
  const { id } = req.params;
  try {
    const pizza = await Pizza.findByIdAndDelete(id);
    if (!pizza) {
      return res
        .status(404)
        .json({ message: "Pizza bulunamadı", success: false });
    }
    return res
      .status(200)
      .json({ message: "Pizza silindi", success: true, pizza });
  } catch (error) {
    console.log("🚀 ~ deletePizza ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePizza = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    ingredients,
    price,
    image,
    description,
    smallPrice,
    mediumPrice,
    largePrice,
  } = req.body;
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      id,
      {
        name,
        ingredients,
        price,
        image,
        description,
        smallPrice,
        mediumPrice,
        largePrice,
      },
      { new: true }
    );
    if (!pizza) {
      return res
        .status(404)
        .json({ message: "Pizza bulunamadı", success: false });
    }
    return res
      .status(200)
      .json({ message: "Pizza güncellendi", success: true, pizza });
  } catch (error) {
    console.log("🚀 ~ updatePizza ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createPizza, getPizza, getPizzas, deletePizza, updatePizza };
