import React from "react";
import "./App.css";
import { CategoryManager } from "./components/CategoryManager";
import { DataStore } from "aws-amplify";
import { Category } from "./models";

function App() {
  return (
    <div>
      <h1>Groceries</h1>
      <CategoryManager></CategoryManager>
    </div>
  );
}

export default App;
