import React, { useEffect, useState } from "react";
import { DataStore } from "aws-amplify";
import { Category } from "../models/index";

export function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const subscription = DataStore.observe(Category).subscribe(async (_) => {
      setCategories(await DataStore.query(Category));
      return () => {
        console.log("Unsubscribing");
        subscription.unsubscribe();
      };
    });
  }, []);

  const insertCategory = async () => {
    let input = document.getElementById("categoryName") as HTMLInputElement;
    const name = input.value.trim();
    await DataStore.save(new Category({ name: name, order: 1 }));
    input.value = "";
  };

  const deleteCategory = async (category: Category) => {
    DataStore.delete(category);
  };

  const categoryListItems = categories.map((c) => (
    <li key={c.id}>
      {c.name}
      <button onClick={async (e) => await deleteCategory(c)}>Delete</button>
    </li>
  ));

  return (
    <div>
      <h1>Categories</h1>
      <div>
        <input id="categoryName" placeholder="Insert category"></input>
        <button onClick={async (e) => await insertCategory()}>Ok</button>
      </div>
      <ul>{categoryListItems}</ul>
    </div>
  );
}
