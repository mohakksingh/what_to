"use client";

import CreateList from "@/components/CreateList";
import ListItems from "@/components/ListItems";

export default function CreateListPage() {
  return (
    <div className="">
      <div className="container flex flex-row items-start mx-auto pt-4">
        <CreateList />
        <ListItems />
      </div>
    </div>
  );
}
