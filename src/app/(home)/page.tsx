"use server";

import { Suspense } from "react";
import FeaturedProductsLoadingSkeleton from "./components/featured-products-section/FeaturedProductsLoadingSkeleton";
import FeaturedProductsSection from "./components/featured-products-section/FeaturedProductsSection";
import HeroSection from "./components/hero-section/HeroSection";

export default async function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <HeroSection />
      {/** We will add a fallback to show until its childen finish loading */}
      <Suspense fallback={<FeaturedProductsLoadingSkeleton />}>
        <FeaturedProductsSection />
      </Suspense>
    </main>
  );
}
