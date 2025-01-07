import React from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Subscribe = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white text-center mb-12">
        Ready to Start Making Better Decisions?
      </h2>
      <p className="mx-auto max-w-[900px] text-white md:text-xl pb-3">
        Join WhatTo today and experience the power of collaborative
        decision-making.
      </p>

      <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <Link href="/signup">
          Get Started
        </Link>
      </button>
    </div>
  );
};

export default Subscribe;
