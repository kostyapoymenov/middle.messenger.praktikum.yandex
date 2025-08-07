import type { TPage } from "../App";

export const getPageFromPath = (path: string): TPage => {
  switch (path) {
    case "/login":
      return "login";
    case "/registration":
      return "registration";
    case "/chat":
      return "chat";
    case "/profile":
      return "profile";
    case "/500":
      return "500";
    case "/createQuestionnaire":
      return "createQuestionnaire";
    case "/answerQuestionnaire":
      return "answerQuestionnaire";
    default:
      return "404";
  }
};
