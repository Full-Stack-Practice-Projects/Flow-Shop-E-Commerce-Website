"use client";

import SearchField from "@/components/searchField/SearchField";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import UserButton from "@/components/user/userButton/UserButton";
import { members } from "@wix/members";
import { collections } from "@wix/stores";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  collections: collections.Collection[];
  loggedInMember: members.Member | null;
}

export default function MobileMenu({
  collections,
  loggedInMember,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    /**
     * To close the sheet if we clicked on any link in the sheet.
     * We can do it also by adding onClick handler on <Link> tag and close the sheet also.
     */
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="inline-flex lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-full p-8">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center space-y-10 py-10">
            <SearchField className="w-full" />
            <ul className="space-y-5 text-center text-lg">
              <li>
                <Link href="/shop" className="font-semibold hover:underline">
                  Shop
                </Link>
              </li>
              {collections.map((collection) => {
                return (
                  <li key={collection._id}>
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="font-semibold hover:underline"
                    >
                      {collection.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <UserButton loggedInMemeber={loggedInMember} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
