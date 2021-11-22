declare module Express {
  interface Request {
    user: Record<string, any>;
  }
}
