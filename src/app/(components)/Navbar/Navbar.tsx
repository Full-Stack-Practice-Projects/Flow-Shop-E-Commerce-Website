"use server";

import MainNavigation from "@/app/MainNavigation";
import logo from "@/assets/logo.png";
import SearchField from "@/components/searchField/SearchField";
import UserButton from "@/components/user/userButton/UserButton";
import { getWixServerClient } from "@/lib/wix-server.base";
import { getCart } from "@/wix-api/cart";
import { getCollections } from "@/wix-api/collections";
import { getLoggedInMemebers } from "@/wix-api/members";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./components/MobileMenu";
import ShoppingCartButton from "./components/ShoppingCartButton";

export default async function Navbar() {
  /**
   * Execute multiple process in parallel that dose not depend on each others
   */

  const wixServerClient = await getWixServerClient();

  const [cart, loggedInMemeber, collections] = await Promise.all([
    getCart(wixServerClient),
    getLoggedInMemebers(wixServerClient),
    getCollections(wixServerClient),
  ]);

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <MobileMenu
          collections={collections}
          loggedInMember={loggedInMemeber}
        />
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-4">
            <Image src={logo} alt="Flow Shop logo" width={40} height={40} />
            <span className="text-xl font-bold">Flow Shop</span>
          </Link>
          <MainNavigation
            collections={collections}
            className="hidden lg:flex"
          />
        </div>
        <SearchField className="hidden max-w-96 lg:inline" />
        <div className="flex items-center justify-center gap-5">
          <UserButton
            loggedInMemeber={loggedInMemeber}
            className="hidden lg:inline-flex"
          />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
