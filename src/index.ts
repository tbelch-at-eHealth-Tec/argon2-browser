import { hash as argon2Hash } from "./argon2-demo-webpack";

const value = "A1234567892000-01-01";
const salt = "TFVtd2FaQmNIWTYxWDhEbg";

argon2Hash(value, salt, document.getElementById("argon-2") ?? document.body, [
  "$argon2i$v=19$m=1024,t=2,p=2$VEZWdGQyRmFRbU5JV1RZeFdEaEViZw$kwPhUx/bilVee0p+9QpPQrHsyA",
  "$argon2i$v=19$m=1024,t=2,p=2$VEZWdGQyRmFRbU5JV1RZeFdEaEViZw$kwPhUx/bilVee0p+9QpPQrHsyAB",
]);
