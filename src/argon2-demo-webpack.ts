import * as argon2 from "argon2-browser";

console.log("argon2", argon2);

argon2
  .hash({
    pass: "p@ssw0rd",
    salt: "somesalt",
  })
  .then((hash: any) => {
    const root = document.querySelector("pre");
    if (root) {
      root.innerText = `Encoded: ${hash.encoded}\n` + `Hex: ${hash.hashHex}\n`;
    } else {
      console.log(`Encoded: ${hash.encoded}\n` + `Hex: ${hash.hashHex}\n`);
    }

    argon2
      .verify({
        pass: "p@ssw0rd",
        encoded: hash.encoded,
      })
      .then(() => {
        const root = document.querySelector("pre");
        if (root) {
          root.innerText += "Verified OK";
        } else {
          console.log("Verified OK");
        }
      })
      .catch((e) => console.error("Error: ", e));
  })
  .catch((e) => console.error("Error: ", e));
