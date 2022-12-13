import { jwtVerify } from "jose";
import UnAuthorizedError from "../errors/unauthorized";

const checkAdminPermissions = async (accessToken) => {
  const { payload } = await jwtVerify(
    accessToken,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  if (payload.isAdmin) return;

  throw new UnAuthorizedError("Only Admins can assess this resource");
};

export default checkAdminPermissions;
