const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const dontenv = require("dotenv");
const validator = require("validator");

dontenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Şifre hatalı" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    if (!token || !cookieOptions) {
      return res.status(500).json({ message: "Token oluşturulamadı" });
    }

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      message: "Giriş yapıldı",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        surName: user.surName,
        image: user.image,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  const { name, surName, email, password, passwordConfirm, image } = req.body;
  try {
    const errors = [];
    if (!name) {
      errors.push({ message: "Ad alanı zorunludur" });
    }
    if (!surName) {
      errors.push({ message: "Soyad alanı zorunludur" });
    }
    if (!validator.isEmail(email)) {
      errors.push({ message: "Email alanı geçersiz" });
    }
    if (!validator.isLength(password, { min: 6, max: 32 })) {
      errors.push({
        message: "Şifre en az 6 ve en fazla 32 karakter uzunlugunda olmalıdır",
      });
    }
    if (!validator.equals(password, passwordConfirm)) {
      errors.push({ message: "Şifreler uyuşmuyor" });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Bu email adresi kullanımda" });
    }

    const newUser = new User({
      name,
      email,
      surName,
      password,
      passwordConfirm,
      image,
    });

    const users = await newUser.save();

    const token = jwt.sign({ _id: users._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    if (!token) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.status(201).json({
      message: "Kullanıcı kaydedildi",
      success: true,
      token,
      users,
    });
  } catch (error) {
    console.log("🚀 ~ register ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    console.log("🚀 ~ getUser ~ user:", user);
    if (!user) {
      return res.status(404).json({
        message: "Kullanıcı bulunamadı",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Kullanıcı bulundu",
        data: {
          user: user,
        },
        success: true,
      });
    }
  } catch (error) {
    console.log("🚀 ~ authControllers ~ error:", error);
    res.status(500).send({
      success: false,
      message: "Yetkiniz yok",
    });
  }
};

const userUpdate = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Kullanıcı bulunamadı", success: false });
    } else {
      return res.status(200).json({
        message: "Kullanıcı bilgileri getirildi",
        user,
        success: true,
      });
    }
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { login, register, getUser };
