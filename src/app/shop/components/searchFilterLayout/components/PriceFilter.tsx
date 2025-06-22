"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface PriceFilterProps {
  /** We got the default values from the server */
  minDefaultPrice: string | undefined;
  maxDefaultPrice: string | undefined;
  updatePriceRange: (min: string | undefined, max: string | undefined) => void;
}

export default function PriceFilter({
  minDefaultPrice,
  maxDefaultPrice,
  updatePriceRange,
}: PriceFilterProps) {
  const [minInput, setMinInput] = useState(minDefaultPrice);
  const [maxInput, setMaxInput] = useState(maxDefaultPrice);

  useEffect(() => {
    /** Resets our inputs field when default values from server changes.
     * like navigate to prev page and return.
     * And there is a button called GO, so we do not need to reflect the changes directly on url so we do not need optimistic here.
     */
    console.log(`useEffect ...`);
    setMinInput(minDefaultPrice || "");
    setMaxInput(maxDefaultPrice || "");
  }, [minDefaultPrice, maxDefaultPrice]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    updatePriceRange(minInput, maxInput);
  }

  return (
    <div className="space-y-3">
      <div className="font-bold">Price Range</div>
      <form className="flex items-center gap-2" onSubmit={onSubmit}>
        <Input
          type="number"
          name="minPrice"
          placeholder="Min"
          value={minInput || ""}
          onChange={(e) => setMinInput(e.target.value)}
          className="w-20"
        />
        <span>-</span>
        <Input
          type="number"
          name="maxPrice"
          placeholder="Max"
          value={maxInput || ""}
          onChange={(e) => setMaxInput(e.target.value)}
          className="w-20"
        />
        <Button type="submit">Go</Button>
      </form>
      {(!!minInput || !!maxInput) && (
        <button
          onClick={() => updatePriceRange(undefined, undefined)}
          className="text-sm text-primary hover:underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
