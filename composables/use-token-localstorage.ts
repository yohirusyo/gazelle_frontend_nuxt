export const useTokenLocalStorage = () => {
  return {
    set token(t: string | null) {
      if (typeof window !== "undefined") {
        if (t != null) {
          localStorage.setItem("token", t);
        } else {
          localStorage.removeItem("token");
        }
      }
    },
    get token() {
      if (typeof window !== "undefined") {
        return localStorage.getItem("token");
      } else {
        return null;
      }
    },
  };
};
