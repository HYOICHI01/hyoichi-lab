"use strict";
// フォームは表示確認用。Enterキーを含め、送信を行わない。
// 値の保存、通信、アクセス解析は実装していません。
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}
// 固定ヘッダーのモバイルナビ。非モーダルなのでTab移動は閉じ込めない。
const menuButton = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector("#main-navigation");
const siteHeader = document.querySelector(".site-header");
if (menuButton && mainNavigation && siteHeader) {
  const mobileScreen = window.matchMedia("(max-width: 768px)");
  const setMenuOpen = (open, restoreFocus = false) => {
    const expanded = mobileScreen.matches && open;
    menuButton.setAttribute("aria-expanded", String(expanded));
    menuButton.setAttribute("aria-label", expanded ? "メニューを閉じる" : "メニューを開く");
    mainNavigation.hidden = mobileScreen.matches && !expanded;
    if (restoreFocus && mobileScreen.matches) menuButton.focus();
  };
  const syncMenu = () => {
    const focused = document.activeElement;
    menuButton.hidden = !mobileScreen.matches;
    setMenuOpen(false);
    if (mobileScreen.matches && mainNavigation.contains(focused)) menuButton.focus();
    if (!mobileScreen.matches && focused === menuButton) {
      mainNavigation.querySelector('[aria-current="page"]').focus();
    }
  };
  siteHeader.classList.add("menu-ready");
  document.body.classList.add("menu-ready");
  syncMenu();
  menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
  });
  mainNavigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false, true);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, true);
    }
  });
  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener("focusin", (event) => {
    if (!siteHeader.contains(event.target)) setMenuOpen(false);
  });
  mobileScreen.addEventListener("change", syncMenu);
}