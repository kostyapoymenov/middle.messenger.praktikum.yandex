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

Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("InputField", InputField);
Handlebars.registerPartial("Form", Form);
Handlebars.registerPartial("Search", Search);
Handlebars.registerPartial("ChatItem", ChatItem);

export type TPage =
  | "login"
  | "chat"
  | "registration"
  | "profile"
  | "404"
  | "500"
  | "createQuestionnaire"
  | "answerQuestionnaire";

interface AppState {
  currentPage: TPage;
  questions: string[];
  answers: string[];
}

export default class App {
  state: AppState;
  appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: getPageFromPath(window.location.pathname),
      questions: [],
      answers: [],
    };
    this.appElement = document.getElementById("app");
  }

  render(): void {
    if (!this.appElement) return;

    let template: Handlebars.TemplateDelegate;

    switch (this.state.currentPage) {
      case "chat":
        template = Handlebars.compile(Pages.Chat as string);
        this.appElement.innerHTML = template({});
        break;
      case "login":
        template = Handlebars.compile(Pages.Login as string);
        this.appElement.innerHTML = template({});
        break;
      case "registration":
        template = Handlebars.compile(Pages.Registration as string);
        this.appElement.innerHTML = template({});
        break;
      case "profile":
        template = Handlebars.compile(Pages.Profile as string);
        this.appElement.innerHTML = template({});
        break;
      case "404":
        template = Handlebars.compile(Pages.Page404 as string);
        this.appElement.innerHTML = template({});
        break;
      case "500":
        template = Handlebars.compile(Pages.Page500 as string);
        this.appElement.innerHTML = template({});
        break;
      default:
        template = Handlebars.compile(Pages.Chat as string);
        this.appElement.innerHTML = template({});
        break;
    }
    this.attachEventListeners();
  }

  attachEventListeners(): void {
    if (this.state.currentPage === "createQuestionnaire") {
      const addButton = document.getElementById("add-question");
      const createButton = document.getElementById("create-questionnaire");

      addButton?.addEventListener("click", () => this.addQuestion());
      createButton?.addEventListener("click", () => this.createQuestionnaire());
    } else if (this.state.currentPage === "answerQuestionnaire") {
      const submitButton = document.getElementById("submit-answers");
      submitButton?.addEventListener("click", () => this.submitAnswers());
    }

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

  addQuestion(): void {
    const questionInput = document.getElementById("question-input") as HTMLInputElement | null;
    if (questionInput && questionInput.value.trim()) {
      this.state.questions.push(questionInput.value);
      questionInput.value = "";
      this.render();
    }
  }

  createQuestionnaire(): void {
    if (this.state.questions.length > 0) {
      this.state.currentPage = "answerQuestionnaire";
      this.render();
    }
  }

  submitAnswers(): void {
    alert("Answers submitted!");
  }
}
