import jwt from "jsonwebtoken";

const createToken = (data) => {
  return jwt.sign(data, process.env.ACTIVATION_TOKEN, {
    expiresIn: "1d",
  });
};

export default createToken;
