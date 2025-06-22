"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
}

const PAGE_STEPS = 2;

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  /**
   * PaginationButton are buttons links that points us to same URL but with different page param.
   * And since we are changing the url page in search params that means the component is a client component.
   */

  const searchParams = useSearchParams();

  function getLink(page: number) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page.toString());
    return `?${newSearchParams.toString()}`;
  }

  if (totalPages < 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={getLink(currentPage - 1)}
            className={cn(
              currentPage === 1 && "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => {
          /** index starts at 0 but page starts at 1 */
          const page = index + 1;

          /** We will show
           * the current page
           * the 2 pages next to it in both sides.
           * and the last page.
           */
          /** Edge page is first or last page */
          const isEdgePage = page === 1 || page === totalPages;

          const isNearCurrentPage = Math.abs(page - currentPage) <= PAGE_STEPS;

          if (!isEdgePage && !isNearCurrentPage) {
            /** We want to return one ellipsis at once */
            if (index === 1 && index === totalPages - PAGE_STEPS) {
              return (
                <PaginationItem key={page} className="hidden md:block">
                  <PaginationEllipsis className="text-muted-foreground" />
                </PaginationItem>
              );
            }
            return null;
          }

          return (
            <PaginationItem
              key={page}
              className={cn(
                "hidden md:block",
                page === currentPage && "pointer-events-none block",
              )}
            >
              <PaginationLink
                href={getLink(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={getLink(currentPage + 1)}
            className={cn(
              currentPage >= totalPages &&
                "pointer-events-none text-muted-foreground",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
