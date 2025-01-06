"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import useStore from "@/store/useStore";
import CreateList from "@/components/CreateList";
import NewList from "@/components/NewList";
import ListItems from "@/components/ListItems";

export default function CreateListPage() {
  return (
    <div className="flex flex-row items-start">
      <CreateList />
      <ListItems />
    </div>
  );
}
