import Handlebars from "handlebars";
import * as Pages from "./pages";

import { Link } from "./components/link/link";
import { Button } from "./components/button/button";
import { Input } from "./components/input/input";
import { InputField } from "./components/inputField/inputField";
import { Form } from "./partials/form/form";
import { getPageFromPath } from "./utils/getPageFromPath";
import { Search } from "./components/search/search";
import { ChatItem } from "./components/chatItem/chatItem";
import { Footer } from "./components/footer/footer";
import { Spacer } from "./components/spacer/spacer";

import { renderTemplate } from "./utils/renderTemplate";

import { linkPages } from "./components/footer/const";

Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("InputField", InputField);
Handlebars.registerPartial("Form", Form);
Handlebars.registerPartial("Search", Search);
Handlebars.registerPartial("ChatItem", ChatItem);
Handlebars.registerPartial("Spacer", Spacer);

export type TPage =
  | "login"
  | "chat"
  | "registration"
  | "profile"
  | "404"
  | "500"
  | "changeProfile"
  | "changePassword";

interface AppState {
  currentPage: TPage;
  questions: string[];
  answers: string[];
}

export default class App {
  state: AppState;
  appElement: HTMLElement | null;
  footerElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: getPageFromPath(window.location.pathname),
      questions: [],
      answers: [],
    };
    this.appElement = document.getElementById("app");
    this.footerElement = document.getElementById("footer");
  }

  render(): void {
    if (!this.appElement || !this.footerElement) return;

    switch (this.state.currentPage) {
      case "chat":
        renderTemplate(this.appElement, Pages.Chat);
        break;
      case "login":
        renderTemplate(this.appElement, Pages.Login);
        break;
      case "registration":
        renderTemplate(this.appElement, Pages.Registration);
        break;
      case "profile":
        renderTemplate(this.appElement, Pages.Profile);
        break;
      case "404":
        renderTemplate(this.appElement, Pages.Page404);
        break;
      case "500":
        renderTemplate(this.appElement, Pages.Page500);
        break;
      case "changeProfile":
        renderTemplate(this.appElement, Pages.ChangeProfile);
        break;
      case "changePassword":
        renderTemplate(this.appElement, Pages.ChangePassword);
        break;
      default:
        renderTemplate(this.appElement, Pages.Chat);
        break;
    }

    renderTemplate(this.footerElement, Footer, { footerLinks: linkPages });
    this.attachEventListeners();
  }

  attachEventListeners(): void {
    const footerLinks = document.querySelectorAll<HTMLAnchorElement>(".footer-link");
    footerLinks.forEach((link) => {
      link.addEventListener("click", (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const page = target.dataset.page as TPage;
        if (page) {
          this.changePage(page);
        }
      });
    });
  }

  changePage(page: TPage): void {
    this.state.currentPage = page;
    this.render();
  }
}
