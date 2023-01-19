"use client";
import React from "react";
import Button from "@/components/Button";

const Navbar = () => {
  return (
    <nav>
      <h1>Navbar</h1>
      <Button onClick={() => console.log("clicked")} text="nav" />
    </nav>
  );
};

export default Navbar;
