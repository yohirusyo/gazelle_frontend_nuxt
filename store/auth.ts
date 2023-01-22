import { defineStore } from "pinia";

export const enum ROLE {
  ADMIN = "ADMIN",
  OPERATOR = "OPERATOR",
  DRIVER = "DRIVER",
  WATCHER = "WATCHER",
  CUSTOMER = "CUSTOMER",
}

export interface ITokenResponse {
  token: string;
}

interface ICommonCurrentUser {
  id: number;
  phoneNumber: string;
  role: ROLE;
  fcmToken?: string;
  version?: string;
  isDefaultPassword: boolean;
}

export interface IUserCurrentUser extends ICommonCurrentUser {
  name: string;
  surname: string;
  middlename: string;
  login: string;
  workingPhoneNumber: string;
  transportId?: number | undefined;
  isOnDriverShift: boolean;
}

export interface ICustomerCurrentUser extends ICommonCurrentUser {
  fullname: string;
  subdivision: string;
}

export interface IAuthStore {
  currentUser: IUserCurrentUser | ICustomerCurrentUser | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): IAuthStore => {
    return {
      currentUser: null,
    };
  },
  getters: {
    authed: (state: IAuthStore) => !!state.currentUser,
    fullname: (state: IAuthStore) => {
      if (!state.currentUser) return;
      if (state.currentUser.role == ROLE.CUSTOMER)
        return (state.currentUser as ICustomerCurrentUser).fullname;
      const currentUser = state.currentUser as IUserCurrentUser;
      return `${currentUser.surname} ${currentUser.name} ${currentUser.middlename}`;
    },
    role: (state: IAuthStore) => {
      switch (state.currentUser?.role) {
        case ROLE.ADMIN:
          return "Администратор";
        case ROLE.CUSTOMER:
          return `Заказчик (${
            (state.currentUser as ICustomerCurrentUser).subdivision
          })`;
        case ROLE.DRIVER:
          return "Водитель";
        case ROLE.OPERATOR:
          return "Диспетчер";
        case ROLE.WATCHER:
          return "Наблюдатель";
      }
    },
  },
  actions: {
    async login(form: { login: string; password: string }): Promise<void> {
      const { token } = await $fetch<ITokenResponse>(
        "http://95.213.216.231:3125/auth",
        {
          body: form,
          method: "POST",
        }
      );
      const tls = useTokenLocalStorage();
      tls.token = `Bearer ${token}`;
      await this.requestCurrentUser();
    },
    async requestCurrentUser(): Promise<void> {
      const tls = useTokenLocalStorage();
      if (tls.token) {
        const data = await $fetch<ICustomerCurrentUser | IUserCurrentUser>(
          "http://95.213.216.231:3125/user/current",
          {
            headers: [["Authorization", tls.token]],
            method: "GET",
          }
        );
        this.currentUser = data;
      }
    },
    logout(): void {
      const tls = useTokenLocalStorage();
      tls.token = null;
      this.currentUser = null;
    },
  },
});
