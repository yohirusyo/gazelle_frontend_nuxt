import { defineStore } from "pinia";

export interface IPlace {
  id: number;
  name: string;
  latitude?: number;
  longitude?: number;
}

export interface IPlaceStore {
  places: IPlace[];
  isLoaded: boolean;
}

export const usePlaceStore = defineStore("place", {
  state: (): IPlaceStore => {
    return {
      places: [],
      isLoaded: false,
    };
  },
  getters: {
    getById: (state: IPlaceStore) => (id: number) =>
      state.places.find((p) => p.id === id),
  },
  actions: {
    async requestPlaces() {
      const tls = useTokenLocalStorage();
      if (tls.token) {
        this.isLoaded = false;
        const data = await $fetch<IPlace[]>(
          "http://95.213.216.231:3125/place",
          {
            headers: [["Authorization", tls.token]],
            method: "GET",
          }
        );
        this.places = data;
        this.isLoaded = true;
      }
    },
  },
});
