import React, { useEffect, useState } from "react";

import { hash as toHash, verify } from "./hash";

import logo from "./logo.svg";
import "./App.css";

const value = "A1234567892000-01-01";
const salt = "TFVtd2FaQmNIWTYxWDhEbg";
const toVerify = [
  "$argon2i$v=19$m=1024,t=2,p=2$VEZWdGQyRmFRbU5JV1RZeFdEaEViZw$kwPhUx/bilVee0p+9QpPQrHsyA",
  "$argon2i$v=19$m=1024,t=2,p=2$VEZWdGQyRmFRbU5JV1RZeFdEaEViZw$kwPhUx/bilVee0p+9QpPQrHsyAB",
];

function App() {
  const [hash, setHash] = useState();
  const [verified, setVerified] = useState([]);

  useEffect(() => {
    toHash(value, salt).then((hash) => {
      if (hash) {
        setHash(hash);
        [hash, ...toVerify].forEach((hash, i) => {
          verify(value, hash).then((isVerified) => setVerified((verified) => [...verified, { hash, isVerified }]));
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Value: <code>{value}</code>
        </p>
        <p>
          Salt: <code>{salt}</code>
        </p>
        <p>
          Hash: <code>{hash}</code>
        </p>
        {verified.map(({ hash, isVerified }) => (
          <p>
            <span>{isVerified ? "✔️" : "❌"}</span> {hash}
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;
