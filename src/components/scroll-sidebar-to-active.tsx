"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollSidebarToActive() {
  const pathname = usePathname();

  useEffect(() => {
    const activeLink = document.querySelector(
      'a[href="' + pathname + '"]',
    ) as HTMLElement;

    if (activeLink) {
      // Find the sidebar container (CardContent with overflow-y-auto)
      const sidebarContainer = activeLink.closest(
        "[class*='overflow-y-auto']",
      ) as HTMLElement;

      if (sidebarContainer) {
        // Get the position of the link relative to the container using getBoundingClientRect
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = sidebarContainer.getBoundingClientRect();

        // Calculate position relative to container
        const linkTopRelativeToContainer =
          linkRect.top - containerRect.top + sidebarContainer.scrollTop;

        const containerHeight = sidebarContainer.clientHeight;
        const linkHeight = activeLink.clientHeight;

        // Calculate scroll position to center the link
        const scrollPosition =
          linkTopRelativeToContainer - containerHeight / 2 + linkHeight / 2;

        // Scroll only the sidebar container
        sidebarContainer.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }
    }
  }, [pathname]);

  return null;
}
