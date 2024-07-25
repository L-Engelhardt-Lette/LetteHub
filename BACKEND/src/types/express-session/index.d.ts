import "express-session";

declare module "express-session" {
  interface Session {
    user?: { email: string };
  }
}
