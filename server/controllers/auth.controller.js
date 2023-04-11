import { AuthenticationError, ForbiddenError } from "apollo-server-core";
import userModel from "../models/user.model.js";
import redisClient from "../utils/connectRedis.js";
import { signJwt, verifyJwt } from "../utils/jwt.js";
import errorHandler from "./error.controller.js";
const accessTokenExpireIn = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN;
const refreshTokenExpireIn = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN;

const cookieOptions = {
  httpOnly: true,
  sameSite: "none",
  secure: true,
};

const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: accessTokenExpireIn * 60 * 1000,
  expires: new Date(Date.now() + accessTokenExpireIn * 60 * 1000),
};

const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: refreshTokenExpireIn * 60 * 1000,
  expires: new Date(Date.now() + refreshTokenExpireIn * 60 * 1000),
};

const signup = async (
  parent,
  { input: { name, email, password, passwordConfirm } },
  { req }
) => {
  try {
    const user = await userModel.create({
      name,
      email,
      password,
      passwordConfirm,
    });

    return {
      status: "success",
      user,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw new ForbiddenError("User already exist");
    }
    errorHandler(error);
  }
};

async function signTokens(user) {
  await redisClient.set(user.id, JSON.stringify(user), {
    EX: 60 * 60,
  });
  console.log(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN);
  const access_token = signJwt({ user: user.id }, "JWT_ACCESS_PRIVATE_KEY", {
    expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRES_IN}m`,
  });

  const refresh_token = signJwt({ user: user.id }, "JWT_REFRESH_PRIVATE_KEY", {
    expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRES_IN}m`,
  });

  return { access_token, refresh_token };
}

const login = async (parent, { input: { email, password } }, { req, res }) => {
  try {
    const user = await userModel
      .findOne({ email })
      .select("+password +verified");

    if (!user || !(await user.comparePasswords(password, user.password))) {
      throw new AuthenticationError("Invalid email or password");
    }

    user.password = undefined;

    const { access_token, refresh_token } = await signTokens(user);

    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return {
      status: "success",
      access_token,
    };
  } catch (error) {
    errorHandler(error);
  }
};

const refreshAccessToken = async (parent, args, { req, res }) => {
  try {
    const { refresh_token } = req.cookies;
    const decoded = verifyJwt(refresh_token, "JWT_REFRESH_PUBLIC_KEY");
    if (!decoded) {
      throw new ForbiddenError("Could not refresh access token");
    }

    const session = await redisClient.get(decoded.user);

    if (!session) {
      throw new ForbiddenError("User session has expired");
    }

    const user = await userModel
      .findById(JSON.parse(session)._id)
      .select("+verified");

    if (!user || !user.verified) {
      throw new ForbiddenError("Could not refresh access token");
    }

    const access_token = signJwt({ user: user._id }, "JWT_ACCESS_PRIVATE_KEY", {
      expiresIn: process.env.jwtAccessTokenExpiresIn,
    });

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("logged_in", "true", {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return {
      status: "success",
      access_token,
    };
  } catch (error) {
    errorHandler(error);
  }
};

const logoutHandler = async (_, args, { req, res, getAuthUser }) => {
  try {
    await checkIsLoggedIn(req, getAuthUser);

    const user = await getAuthUser(req);
    await redisClient.del(user._id);
    res.cookie("access_token", "", { maxAge: -1 });
    res.cookie("refresh_token", "", { maxAge: -1 });
    res.cookie("logged_in", "", { maxAge: -1 });

    return true;
  } catch (error) {
    errorHandler(error);
  }
};

export default {
  signup,
  login,
  refreshAccessToken,
  logoutHandler,
};
