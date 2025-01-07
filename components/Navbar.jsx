"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, History, LogOut, User, Plus } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="border-b bg-black">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex flex-row space-x-2">
          <Image src={"/logo.webp"} width={25} height={20} alt="logo" className="rounded-md" />
          <Link href="/" className="text-xl font-bold text-white">
            WhatTo?
          </Link> 
        </div>

        {session ? (
          <div className="flex items-center space-x-4">
            <Button variant="default" asChild>
              <Link href="/main">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href="/main/create">
                <Plus className="w-4 h-4 mr-2" />
                Create WhatTo
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="relative">
                  <User className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/history">
                    <History className="w-4 h-4 mr-2" />
                    History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ redirect: false })}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="space-x-4">
            <Button variant="default" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
