"use client";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

interface SearchFieldProps {
  className?: string;
}

export default function SearchField({ className }: SearchFieldProps) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) {
      return;
    }
    router.push(`q?${encodeURIComponent(q)}`);
  }

  /**
   * onSubmit require a JS this is fine.
   * It can happen that someone has a slow internet connection and JS part takes a while to load (JS and search will not work yet).
   
  * We can handle this by pass this values to form (this consider as a fallback if JS has not loaded yet).
   * If the user submit a form before JS loaded, it will make a GET req to the action url and append the searchParams to the provided url /shop
   */

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grow", className)}
      method="GET"
      action={`/shop`}
    >
      <div className="relative">
        <Input name="q" placeholder="Search ..." className="pe-10" />
        <SearchIcon className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground" />
      </div>
    </form>
  );
}
