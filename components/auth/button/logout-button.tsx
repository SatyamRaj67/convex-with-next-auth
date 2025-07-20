"use client";

import { Button } from "@/components/ui/button";

import { useAuthActions } from "@convex-dev/auth/react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const { signOut } = useAuthActions();
  const onClick = () => {
    signOut();
  };

  return (
    <Button onClick={onClick} className="cursor-pointer" asChild>
      {children}
    </Button>
  );
};
