"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/auth/useAuth";
import { members } from "@wix/members";
import { LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";

interface UserButtonProps {
  loggedInMemeber: members.Member | null;
  className?: string;
}

export default function UserButton({
  loggedInMemeber,
  className,
}: UserButtonProps) {
  const { login, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className={className}>
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-44 max-w-64">
        {loggedInMemeber && (
          <>
            <DropdownMenuLabel>
              Logged in as{" "}
              {loggedInMemeber.contact?.firstName || loggedInMemeber.loginEmail}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/profile">
              <DropdownMenuItem>
                <UserIcon className="mr-2 size-4" />
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
          </>
        )}
        {loggedInMemeber ? (
          <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
            <LogOutIcon className="mr-2 size-4" />
            Logout
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => login()} className="cursor-pointer">
            <LogInIcon className="mr-2 size-4" />
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
