function isDiscordInvite(url) {
  let invite = url.match(
    /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discord\.com|discordapp\.com\/invite)\/.+[a-z|A-Z|0-9]/g
  );
  if (invite) {
    return url.split("/").pop();
  }
  return invite;
}
function isTwitterLink(url) {
  let istwitterLink = url.match(
    /(?:http:\/\/)?(?:https:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?(\w*)/g
  );
  return istwitterLink ? true : false;
}
let utils = {
  isTwitterLink,
  isDiscordInvite,
};
export default utils;
