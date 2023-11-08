export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/tasks", "/api/tasks", "/api/tasks/[id] ", "/tasks/history"],
};
