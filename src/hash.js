import argon2 from "argon2-browser";

export function hash(value, salt) {
  return argon2
    .hash({
      pass: value,
      salt,
      type: argon2.ArgonType.Argon2i,
      time: 2,
      parallelism: 2,
    })
    .then(({ encoded }) => {
      console.log("encoded", encoded);
      return encoded;
    })
    .catch((e) => console.error("hash", e));
}

export function verify(value, encoded) {
  return argon2
    .verify({
      pass: value,
      encoded,
    })
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
}
