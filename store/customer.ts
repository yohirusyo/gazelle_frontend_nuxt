import { defineStore } from "pinia";

export interface ICustomer {
  id: number;
  fullname: string;
  phoneNumber: string;
  subdivision: string;
}

export interface ICustomerStore {
  customers: ICustomer[];
  isLoaded: boolean;
}

export const useCustomerStore = defineStore("customer", {
  state: (): ICustomerStore => {
    return {
      customers: [],
      isLoaded: false,
    };
  },
  getters: {
    getById: (state: ICustomerStore) => (id: number) =>
      state.customers.find((p) => p.id === id),
  },
  actions: {
    async requestCustomers() {
      const tls = useTokenLocalStorage();
      if (tls.token) {
        this.isLoaded = false;
        const data = await $fetch<ICustomer[]>(
          "http://95.213.216.231:3125/customer",
          {
            headers: [["Authorization", tls.token]],
            method: "GET",
          }
        );
        this.customers = data;
        this.isLoaded = true;
      }
    },
  },
});
