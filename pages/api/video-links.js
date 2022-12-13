import dbConnect from "../../lib/mongodb";
import VideoLink from "../../models/VideoLink";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../utils";
import cookie from "cookie";
import UnAuthenticatedError from "../../errors/unauthenticated";
import checkAdminPermissions from "../../utils/checkIsAdmin";
import BadRequestError from "../../errors/bad-request";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const videoLinks = await VideoLink.find();
      res.status(StatusCodes.OK).json(videoLinks);
    }

    if (method === "POST") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      const doesLinkExist = await VideoLink.findOne({ link: req.body.link });
  
      if (doesLinkExist) {
        throw new BadRequestError(" Video Link Already Exists");
      }
      const videoLink = await VideoLink.create(req.body);
      res.status(StatusCodes.CREATED).json({ msg: "Link Added Successfully" });
    }

    if (method === "PUT") {
      const { id } = query;
      const linkData = await VideoLink.findById(id);

      if (!linkData) {
        throw new BadRequestError(" Link Does not Exist ");
      }
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      const videoLink = await VideoLink.findOneAndUpdate({ id: id }, req.body);
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "Link Updated Successfully" });
    }

    if (method === "DELETE") {
      const { id } = query;
      const videoLink = await VideoLink.findById(id);

      if (!videoLink) {
        throw new BadRequestError(" Link Does not Exist ");
      }

      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      await VideoLink.findOneAndDelete({ id: id });
      res.status(StatusCodes.OK).json({ msg: "Link Deleted Successfully" });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
