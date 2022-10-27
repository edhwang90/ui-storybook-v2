import { useLayoutEffect } from "react";

export const useScrollSpy = () => {
  const onScrollUpdate = (entry, isInViewPort) => {
    const { target, boundingClientRect } = entry;

    const menuItem = document.querySelector(
      `[data-scrollspy-id="${target.id}"]`
    );

    if (menuItem.classList.contains("active")) {
      menuItem.classList.remove("active");
    }

    if (boundingClientRect.y <= 0 && isInViewPort) {
      menuItem.classList.add("active");
    }
  };

  return {
    onScrollUpdate
  };
};

export const ScrollSpy = () => {
  const { onScrollUpdate } = useScrollSpy();

  const isInViewPort = (entry, offset = 0) => {
    const rect = entry.boundingClientRect;

    return rect.top - 1 <= 0 + offset && rect.bottom >= 0 + offset;
  };

  useLayoutEffect(() => {
    // scrollable content containers attribute
    const scrollables = document.querySelectorAll("[data-scrollspy]");

    for (let scrollable of scrollables) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            onScrollUpdate && onScrollUpdate(entry, isInViewPort(entry));
          });
        },
        {
          root: null,
          rootMargin: "0px 0px 100% 0px",
          threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        }
      );
      observer.observe(scrollable);
    }
  }, [onScrollUpdate]);
};
