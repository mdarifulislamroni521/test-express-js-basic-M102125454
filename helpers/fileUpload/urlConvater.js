// module

// module scaffolding
const urlConvater = {};
urlConvater.uploadUrl = (req, picObjs = []) => {
  let response = [];
  const picPath =
    typeof picObjs === "object" && picObjs instanceof Array ? picObjs : false;
  const siteUrl =
    typeof req.get("host") === "string"
      ? `${req.protocol}://${req.get("host")}`
      : false;
  if (picPath && siteUrl) {
    for (let pobj of picObjs) {
      response.push(`${siteUrl}/${pobj.path}`);
    }
    return response;
  } else {
    return false;
  }
};

module.exports = urlConvater;
