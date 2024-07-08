const Pizza = require("../Models/Pizza");
const User = require("../Models/User");
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
      category,
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
      category,
    });
    const pizza = await newPizza.save();
    return res
      .status(200)
      .json({ message: "Pizza oluşturuldu", pizza, success: true });
  } catch (error) {
    console.log("🚀 ~ createPizza ~ error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getPizza = async (req, res) => {
  try {
    const { id } = req.params;
    const pizza = await Pizza.findById(id);
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
    const pizza = await Pizza.find();
    if (!pizza) {
      return res
        .status(404)
        .json({ message: "Pizza bulunamadı", success: false });
    }
    res
      .status(200)
      .json({ pizza, success: true, message: "Pizzalar getirildi" });
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

const categoryPizza = async (req, res) => {
  try {
    const { category } = req.query;
    if (category === "Hepsi") {
      const pizza = await Pizza.find();
      console.log("🚀 ~ categoryPizza ~ pizza:", pizza);
      res.status(200).json({
        message: "Yemeklerin Hepsi Geterildi",
        success: true,
        pizza,
      });
    } else {
      const pizza = await Pizza.find({ category });
      res.status(200).json({
        message: "Yemeklerin Geterildi",
        success: true,
        pizza,
      });
    }
  } catch (error) {
    console.log("🚀 ~ categoryPizza ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const favoritePizza = async (req, res) => {
  try {
    const pizza = await Pizza.find().sort({ createdAt: -1 }).limit(5);
    console.log(pizza);
    res.status(200).json({ message: "favori pizzalar", pizza, success: true });
  } catch (error) {
    console.log("🚀 ~ favoritePizza ~ error:", error);
    res.status(500).json({ message: error });
  }
};

const locationPizza = async (req, res) => {
  try {
    const { _id, province, district, neighbourhood, apartment, email, phone } =
      req.body;
    const user = await User.findById(_id);
    console.log("🚀 ~ locationPizza ~ user:", user);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Kullanıcı bulunamadı", success: false });
    }
    if (!province || !district || !neighbourhood || !apartment || !email) {
      return res.status(400).json({ message: "Eksik bilgi", success: false });
    }
    user.province = province || user.province;
    user.district = district || user.district;
    user.neighbourhood = neighbourhood || user.neighbourhood;
    user.apartment = apartment || user.apartment;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();
    res
      .status(200)
      .json({ message: "Adres bilgileri güncellendi", success: true });
  } catch (error) {
    console.log("🚀 ~ locationPizza ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createPizza,
  getPizza,
  getPizzas,
  deletePizza,
  updatePizza,
  categoryPizza,
  favoritePizza,
  locationPizza,
};
