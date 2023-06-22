import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import BillList from "../components/BillList";

const HomePage = observer(() => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/add-bill">Add a new bill</Link>
      <BillList />
    </div>
  );
});

export default HomePage;