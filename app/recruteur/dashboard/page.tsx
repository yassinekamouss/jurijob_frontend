"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
