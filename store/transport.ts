import { defineStore } from "pinia";

export interface ITransport {
  id: number;
  type: string;
  transportNumber: string;
  latitude?: number;
  longitude?: number;
  statusId: number;
  placeId?: number;
  driverId?: number;
  statusChangedAt: Date;
  lastCustomerSubdivision?: string;
  lastCustomerPhoneNumber?: string;
  isDeleted: boolean;
  coordinatesChangedAt?: Date;
}

export interface ITransportStore {
  transports: ITransport[];
  isLoaded: boolean;
}

export const useTransportStore = defineStore("transport", {
  state: (): ITransportStore => {
    return {
      transports: [],
      isLoaded: false,
    };
  },
  getters: {
    getById: (state: ITransportStore) => (id: number) =>
      state.transports.find((p) => p.id === id),
  },
  actions: {
    async requestTransports() {
      const tls = useTokenLocalStorage();
      if (tls.token) {
        this.isLoaded = false;
        const data = await $fetch<ITransport[]>(
          "http://95.213.216.231:3125/transport",
          {
            headers: [["Authorization", tls.token]],
            method: "GET",
          }
        );
        this.transports = data;
        this.isLoaded = true;
      }
    },
  },
});
