"use server";

import logo from "@/assets/logo.png";
import { getWixServerClient } from "@/lib/wix-server.base";
import { getCart } from "@/wix-api/cart";
import Image from "next/image";
import Link from "next/link";

const INITIAL_QUANTITY = 0;

export default async function Navbar() {
  const cart = await getCart(await getWixServerClient());

  const totalQuantity =
    cart?.lineItems?.reduce((acc, item) => {
      const itemQuantity = item.quantity || 0;
      return acc + itemQuantity;
    }, INITIAL_QUANTITY) || 0;

  return (
    <header className="bg-background shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 p-5">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="Flow Shop logo" width={40} height={40} />
          <span className="text-xl font-bold">Flow Shop</span>
        </Link>
        {totalQuantity} items in your cart
      </div>
    </header>
  );
}
