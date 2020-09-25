import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>CryptoEdu</p>
        <p>
          Simulador de Algoritmos de Criptografia com Finalidade Educacional
        </p>
        <p></p>
        <p>
          Powered by&nbsp;
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            React <img src={logo} className="App-logo" alt="logo" />
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
