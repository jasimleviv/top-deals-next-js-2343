"use client";

import { useEffect } from "react";

export function ClientInteractions() {
  useEffect(() => {
    const html = document.documentElement;
    const sun = document.getElementById("icon-sun") as HTMLElement | null;
    const moon = document.getElementById("icon-moon") as HTMLElement | null;
    const themeToggle = document.getElementById("theme-toggle");
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobile-nav");
    const cookieBanner = document.getElementById("cookie-banner") as HTMLElement | null;
    const exitPopup = document.getElementById("exit-popup");
    const popupClose = document.getElementById("popup-close");

    const saved = localStorage.getItem("td-theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const theme = saved || systemTheme;
    html.setAttribute("data-theme", theme);
    if (sun && moon) {
      sun.style.display = theme === "dark" ? "none" : "block";
      moon.style.display = theme === "dark" ? "block" : "none";
    }

    const toggleTheme = () => {
      const current = html.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      localStorage.setItem("td-theme", next);
      if (sun && moon) {
        sun.style.display = next === "dark" ? "none" : "block";
        moon.style.display = next === "dark" ? "block" : "none";
      }
    };

    const closeMobileNav = () => {
      mobileNav?.classList.remove("open");
      hamburger?.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");
    };

    const toggleMobileNav = () => {
      const open = mobileNav?.classList.toggle("open") ?? false;
      hamburger?.classList.toggle("open", open);
      hamburger?.setAttribute("aria-expanded", String(open));
    };

    const filterOffers = (category: string, target: Element | null) => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((button) => button.classList.remove("active"));
      target?.classList.add("active");
      document.querySelectorAll<HTMLElement>(".offer-card").forEach((card) => {
        card.style.display =
          category === "all" || card.dataset.category === category ? "" : "none";
      });
    };

    const updateTimers = () => {
      document.querySelectorAll(".countdown-secs").forEach((secondsElement) => {
        const seconds = secondsElement as HTMLElement;
        const minutes = seconds.previousElementSibling as HTMLElement | null;
        if (!minutes) return;

        let secondsValue = Number.parseInt(seconds.textContent || "0", 10) || 0;
        let minutesValue = Number.parseInt(minutes.textContent || "0", 10) || 0;
        secondsValue -= 1;
        if (secondsValue < 0) {
          secondsValue = 59;
          minutesValue -= 1;
          if (minutesValue < 0) minutesValue = 0;
        }
        seconds.textContent = String(secondsValue).padStart(2, "0");
        minutes.textContent = String(minutesValue).padStart(2, "0");
      });
    };

    const closePopup = () => exitPopup?.classList.remove("show");

    (window as typeof window & {
      closeMobileNav?: () => void;
      closePopup?: () => void;
    }).closeMobileNav = closeMobileNav;
    (window as typeof window & { closePopup?: () => void }).closePopup = closePopup;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(".fade-in,.fade-in-left,.fade-in-right")
      .forEach((element) => observer.observe(element));

    const animateCounter = (element: HTMLElement) => {
      const target = Number.parseFloat(element.dataset.counter || "0");
      const decimals =
        element.dataset.decimals !== undefined
          ? Number.parseInt(element.dataset.decimals, 10)
          : target !== Math.floor(target)
            ? 1
            : 0;
      const prefix = element.dataset.prefix || "";
      const suffix =
        element.dataset.suffix ||
        (target >= 100 ? "K+" : target >= 10 && decimals === 0 ? "+" : "");
      const duration = 950;
      const start = performance.now();
      element.textContent = `${prefix}${decimals > 0 ? "0.0" : "0"}${suffix}`;

      const formatValue = (value: number) =>
        `${prefix}${decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}${suffix}`;

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const value = target * ease;
        element.textContent = formatValue(value);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = formatValue(target);
        }
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting && !target.dataset.counted) {
            target.dataset.counted = "1";
            animateCounter(target);
          }
        });
      },
      { threshold: 0.5 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-counter]")
      .forEach((element) => counterObserver.observe(element));

    const faqHandler = (event: Event) => {
      const question = event.currentTarget as HTMLElement;
      const item = question.closest(".faq-item");
      const open = item?.classList.toggle("open") ?? false;
      question.setAttribute("aria-expanded", String(open));
    };

    const faqKeyHandler = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
        keyboardEvent.preventDefault();
        (keyboardEvent.currentTarget as HTMLElement).click();
      }
    };

    document.querySelectorAll(".faq-question").forEach((question) => {
      question.addEventListener("click", faqHandler);
      question.addEventListener("keydown", faqKeyHandler);
    });

    const filterHandler = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      filterOffers(target.dataset.filter || "all", target);
    };
    document
      .querySelectorAll("[data-filter]")
      .forEach((button) => button.addEventListener("click", filterHandler));

    const cardHandler = (event: Event) => {
      const target = event.currentTarget as HTMLElement;
      const href = target.dataset.cardHref;
      if (href) window.location.href = href;
    };

    const cardKeyHandler = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
        keyboardEvent.preventDefault();
        (keyboardEvent.currentTarget as HTMLElement).click();
      }
    };

    document.querySelectorAll("[data-card-href]").forEach((card) => {
      card.addEventListener("click", cardHandler);
      card.addEventListener("keydown", cardKeyHandler);
    });

    const navHandler = () => closeMobileNav();
    mobileNav
      ?.querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", navHandler));

    const cookieHandler = (event: Event) => {
      const action = (event.currentTarget as HTMLElement).dataset.cookieAction;
      if (action === "accept") localStorage.setItem("td-cookie", "1");
      if (!cookieBanner) return;
      cookieBanner.style.opacity = "0";
      window.setTimeout(() => {
        cookieBanner.style.display = "none";
      }, 300);
    };

    if (cookieBanner) {
      cookieBanner.style.display = localStorage.getItem("td-cookie") ? "none" : "flex";
    }
    document
      .querySelectorAll("[data-cookie-action]")
      .forEach((button) => button.addEventListener("click", cookieHandler));

    let popupShown = false;
    const popupOverlayHandler = (event: Event) => {
      if (event.target === exitPopup) closePopup();
    };
    const leaveHandler = (event: MouseEvent) => {
      if (event.clientY <= 0 && !popupShown && !sessionStorage.getItem("td-popup")) {
        popupShown = true;
        sessionStorage.setItem("td-popup", "1");
        window.setTimeout(() => exitPopup?.classList.add("show"), 200);
      }
    };

    const popupLinkHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest("#exit-popup .btn") || target.closest("#exit-popup button:not(#popup-close)")) {
        closePopup();
      }
    };

    themeToggle?.addEventListener("click", toggleTheme);
    hamburger?.addEventListener("click", toggleMobileNav);
    popupClose?.addEventListener("click", closePopup);
    exitPopup?.addEventListener("click", popupOverlayHandler);
    exitPopup?.addEventListener("click", popupLinkHandler);
    document.addEventListener("mouseleave", leaveHandler);
    const timer = window.setInterval(updateTimers, 1000);

    return () => {
      themeToggle?.removeEventListener("click", toggleTheme);
      hamburger?.removeEventListener("click", toggleMobileNav);
      popupClose?.removeEventListener("click", closePopup);
      exitPopup?.removeEventListener("click", popupOverlayHandler);
      exitPopup?.removeEventListener("click", popupLinkHandler);
      document.removeEventListener("mouseleave", leaveHandler);
      document.querySelectorAll("[data-card-href]").forEach((card) => {
        card.removeEventListener("click", cardHandler);
        card.removeEventListener("keydown", cardKeyHandler);
      });
      window.clearInterval(timer);
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null;
}
