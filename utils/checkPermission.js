import UnAuthorizedError from "../errors/unauthorized";

const checkPermissions = (requestUser, resourceUserId) => {
  const slicedUserId = JSON.stringify(resourceUserId).slice(1, -1);
  console.log(requestUser, "requestUser", slicedUserId, "slicedUserId" )
  if (requestUser === slicedUserId) return;
  
  throw new UnAuthorizedError("Not Authorized to access this resource");
};

export default checkPermissions;
