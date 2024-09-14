// src/app/dashboard/page.tsx

"use client";

import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Spinner, Center } from "@chakra-ui/react";

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // This is a placeholder. You should implement proper role-based access control.
  const isAdmin = user?.email?.endsWith("@gmail.com") || false;

  return (
    <ProtectedRoute>
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </ProtectedRoute>
  );
}
