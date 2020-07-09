import * as argon2 from "argon2-browser";

export function hash(value: string, salt: string, root: HTMLElement, toVerify: string[] = []) {
  root.innerText += `Value: ${value}\n` + `salt: ${salt}\n`;
  argon2
    .hash({
      pass: value,
      salt,
      type: argon2.ArgonType.Argon2i,
      time: 2,
      parallelism: 2,
    })
    .then((hash: any) => {
      const text = `Encoded: ${hash.encoded}`;
      if (root) {
        root.innerText += `${text}\n`;
      } else {
        console.log(text);
      }

      argon2
        .verify({
          pass: value,
          encoded: hash.encoded,
        })
        .then(() => {
          const text = "Verified!";
          if (root) {
            root.innerText += `${text}\n`;
          } else {
            console.log(text);
          }
        })
        .catch((e) => {
          const text = `Verification failed! ${e.message}`;
          if (root) {
            root.innerText += `${text}\n`;
          } else {
            console.error(text);
          }
          console.error(e);
        });

      toVerify.forEach((encoded, i) => {
        argon2
          .verify({
            pass: value,
            encoded,
          })
          .then(() => {
            const text = `Verification (${i}) of ${encoded} was successful!`;
            if (root) {
              root.innerText += `${text}\n`;
            } else {
              console.log(text);
            }
          })
          .catch((e) => {
            const text = `Verification (${i}) of ${encoded} failed! ${e.message}`;
            if (root) {
              root.innerText += `${text}\n`;
            } else {
              console.error(text);
            }
            console.error(e);
          });
      });
    })
    .catch((e) => {
      const text = `Encoding failed! ${e.message}`;
      if (root) {
        root.innerText += `${text}\n`;
      } else {
        console.error(text);
      }
      console.error(e);
    });
}
