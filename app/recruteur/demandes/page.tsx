"use client";

import React from "react";
import DemandesList from "./components/DemandesList";

const Page = () => {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mes demandes</h1>
      <DemandesList />
    </div>
  );
};

export default Page;
