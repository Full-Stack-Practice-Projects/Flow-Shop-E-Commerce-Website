import { getWixServerClient } from "@/lib/wix-server.base";
import { getCollections } from "@/wix-api/collections";
import React from "react";
import SearchFilterLayout from "./components/searchFilterLayout/SearchFilterLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const wixServerClient = await getWixServerClient();
  const collections = await getCollections(wixServerClient);

  return (
    <SearchFilterLayout collections={collections}>
      {children}
    </SearchFilterLayout>
  );
}
