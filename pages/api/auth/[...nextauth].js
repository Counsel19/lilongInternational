import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "./../../../lib/mongodb";
import User from "../../../models/User";
import { HandleError } from "../../../utils";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import { serialize } from "cookie";

const nextAuthOptions = (req, res) => {
  return {
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),

      CredentialsProvider({
        name: "Credentials",
        async authorize(credentials, req) {
          await dbConnect();

          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Please Provide all Values");
          }

          const user = await User.findOne({ email }).select("+password");

          if (!user) {
            throw new Error("Invalid Credentials");
          }

          const isPasswordCorrect = await user.comparePassword(password);

          if (!isPasswordCorrect) {
            throw new Error("Incorrect credentials");
          }

          const { accessToken, refreshToken } = await user.createJWT();
          user.password = undefined;

          const serializedToken = serialize("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV != "development",
            maxAge: process.env.JWT_MAX_AGE,
            path: "/",
          });
          const serializedRefreshToken = serialize(
            "refreshToken",
            refreshToken,
            {
              httpOnly: true,
              secure: process.env.NODE_ENV != "development",
              maxAge: 2592000,
              path: "/",
            }
          );

          res.setHeader("Set-Cookie", [
            serializedToken,
            serializedRefreshToken,
          ]);

          return user;
        },
      }),
    ],

    secret: process.env.JWT_SECRET,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
