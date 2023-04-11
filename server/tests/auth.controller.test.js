import authController from "../controllers/auth.controller";
import userModel from "../models/user.model";
import { signTokens } from "../utils/jwt";
import redisClient from "../utils/connectRedis";
import { AuthenticationError } from "apollo-server-core";
jest.mock("../models/user.model.js");
jest.mock("../utils/jwt", () => ({
  signTokens: jest.fn(),
  signJwt: jest.fn(),
}));

userModel.findOne = jest.fn();

describe("AuthController", () => {
  describe("signup", () => {
    it("should return a success status and the user object on successful signup", async () => {
      const userModelMock = jest.spyOn(userModel, "create").mockReturnValue({
        id: "123",
        name: "John Doe",
        email: "johndoe@example.com",
      });

      const result = await authController.signup(
        {},
        {
          input: {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "password",
            passwordConfirm: "password",
          },
        },
        { req: {} }
      );

      expect(result).toEqual({
        status: "success",
        user: { id: "123", name: "John Doe", email: "johndoe@example.com" },
      });

      userModelMock.mockRestore();
    });

    it('should throw a ForbiddenError with message "User already exist" if userModel.create throws a 11000 error', async () => {
      const userModelMock = jest
        .spyOn(userModel, "create")
        .mockImplementation(() => {
          const error = new Error("Duplicate key error");
          error.code = 11000;
          throw error;
        });
    });
  });

  describe("login", () => {
    it("should return a success status and access_token on successful login", async () => {
      const user = {
        id: "123",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password",
        verified: true,
      };

      userModel.findOne.mockResolvedValue(user);
      user.comparePasswords = jest.fn().mockResolvedValue(true);
      const { access_token, refresh_token } =
        await signTokens.mockResolvedValue({
          access_token: "access_token",
          refresh_token: "refresh_token",
        });
      const res = { cookie: jest.fn(), access_token: "access_token" };
      const result = await authController.login(
        {},
        { input: { email: "johndoe@example.com", password: "password" } },
        { req: {}, res: res }
      );
      expect(result).toEqual({
        status: "success",
        access_token,
      });

      expect(res.cookie.mock.calls).toHaveLength(3);
      expect(res.cookie.mock.calls[1][0]).toBe("access_token");
      expect(res.cookie.mock.calls[1][1]).toBe(access_token);

      userModel.findOne.mockRestore();
      user.comparePasswords.mockRestore();
      signTokens.mockRestore();
    });

    it("should throw an AuthenticationError for invalid credentials", async () => {
      const email = "test@example.com";
      const password = "invalidpassword";

      const loginPromise = authController.login(
        null,
        { input: { email, password } },
        { req: null, res: null }
      );

      await expect(loginPromise).rejects.toThrow(AuthenticationError);
    });
  });

  afterAll(async () => {
    await redisClient.quit();
  });
});
