const UserService = require("../services/UserServices");
const JwtServices = require("../services/JwtServices");

const createUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Thiếu thông tin đăng ký",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Email không hợp lệ",
      });
    } else if (password != confirmPassword) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Xác nhận mật khẩu không hợp lệ",
      });
    }
    const result = await UserService.createUser(req.body);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);

    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Thiếu thông tin đăng ký",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Email không hợp lệ",
      });
    }
    const result = await UserService.loginUser(req.body);
    console.log("res111", result);
    const { refresh_token, ...newResult } = result;
    res.cookie("refresh_token", refresh_token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    });
    return res.status(200).json(newResult);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const uplateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Không tồn tại tài khoản",
      });
    }
    const response = await UserService.uplateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Không tồn tại tài khoản",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Không tồn tại tài khoản",
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  console.log("req.cookies", req.cookies);
  console.log("req.cookies.refresh_token", req.cookies.refresh_token);
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        meassage: "Không tồn tại token",
      });
    }
    const response = await JwtServices.refreshTokenJwtServices(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Đăng xuất thành công",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  uplateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
  logoutUser,
};
