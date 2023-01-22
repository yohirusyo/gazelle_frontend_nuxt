import { defineStore } from "pinia";

export interface IOrder {
  id: number;
  orderedAt?: Date;
  orderTime?: Date;
  departurePointId?: number;
  destinationId?: number;
  isEmergency: boolean;
  passengerCount: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  isDone: boolean;
  isDeleted: boolean;
  isRequest: boolean;
  isApproved: boolean;
  isDeclined: boolean;
  name: string;
  description?: string;
  customerId: number;
  contactId?: number;
  transportId?: number;
  statusId?: number;
  statusChangedAt?: Date;
  priority: number;
}

export interface IOrderStore {
  orders: IOrder[];
  isLoaded: boolean;
}

export const useOrderStore = defineStore("order", {
  state: (): IOrderStore => {
    return {
      orders: [],
      isLoaded: false,
    };
  },
  getters: {},
  actions: {
    async requestOrders() {
      const tls = useTokenLocalStorage();
      if (tls.token) {
        this.isLoaded = false;
        const data = await $fetch<IOrder[]>(
          "http://95.213.216.231:3125/order",
          {
            headers: [["Authorization", tls.token]],
            method: "GET",
          }
        );
        this.orders = [...data, ...data, ...data, ...data, ...data, ...data];
        this.isLoaded = true;
      }
    },
  },
});
