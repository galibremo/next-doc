export const routes = {
  public: {
    home: "/",
  },
  private: {
    login: "/login",
  },
} as const;

export const apiRoute = {
  csrf: "/csrf",
} as const;
