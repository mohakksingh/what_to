import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row w-full items-center justify-between">
      <p className="text-xs text-gray-400">
        © 2024 WhatTo. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 text-white">
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/terms"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4"
          href="/privacy"
        >
          Privacy
        </Link>
      </nav>
    </div>
  );
};

export default Footer;
