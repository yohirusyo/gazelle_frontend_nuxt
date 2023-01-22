import { defineStore } from "pinia";

export interface IStatus {
  id: number;
  code: string;
  description: string;
  isBusy: boolean;
  order: number;
  orderNext?: number;
}

export interface IStatusStore {
  statuses: IStatus[];
  isLoaded: boolean;
}

export const useStatusStore = defineStore("status", {
  state: (): IStatusStore => {
    return {
      statuses: [],
      isLoaded: false,
    };
  },
  getters: {
    getById: (state: IStatusStore) => (id: number) =>
      state.statuses.find((p) => p.id === id),
  },
  actions: {
    async requestStatuss() {
      const tls = useTokenLocalStorage();
      if (tls.token) {
        this.isLoaded = false;
        const data = await $fetch<IStatus[]>(
          "http://95.213.216.231:3125/status",
          {
            headers: [["Authorization", tls.token]],
            method: "GET",
          }
        );
        this.statuses = data;
        this.isLoaded = true;
      }
    },
  },
});
