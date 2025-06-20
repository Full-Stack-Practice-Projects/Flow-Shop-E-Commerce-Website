import { Suspense } from "react";
import CollectionsLayout from "./(components)/CollectionsLayout";
import CollectionsLoadingSkeleton from "./(components)/CollectionsLoadingSkeleton";

export interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  return (
    <Suspense fallback={<CollectionsLoadingSkeleton />}>
      <CollectionsLayout params={params}>{children}</CollectionsLayout>
    </Suspense>
  );
}
