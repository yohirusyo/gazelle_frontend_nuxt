<template>
  <Tabs ref="tabs">
    <template #main>
      <Table
        v-if="orderStore.isLoaded"
        :columns="columns"
        :rows="orderStore.orders"
        class="text-[12px]"
      >
        <template v-slot:td-id="{ val: { id, orderTime } }">
          <div class="bg-gray-200 rounded-full m-1">{{ id }}</div>
          <div class="bg-gray-200 rounded-full m-1">{{ orderTime }}</div>
        </template>
      </Table>

      <div v-else>Загрузка заказов...</div>
    </template>
  </Tabs>
</template>

<script lang="ts" setup>
import { useCustomerStore } from "~~/store/customer";
import { useOrderStore } from "~~/store/order";
import { usePlaceStore } from "~~/store/place";
import { useStatusStore } from "~~/store/status";
import { useTransportStore } from "~~/store/transport";
import { IColumn } from "../table/index.vue";
import dayjs from "dayjs";

const orderStore = useOrderStore();
const placeStore = usePlaceStore();
const transportStore = useTransportStore();
const statusStore = useStatusStore();
const customerStore = useCustomerStore();

const tabs = ref(null);
const contentHeight = ref(0);

onMounted(() => {
  useResizeObserver(tabs, ([entry]) => {
    const { height } = entry.contentRect;

    if (height - contentHeight.value >= 5) contentHeight.value = height;
  });
});

await Promise.all([
  orderStore.requestOrders(),
  placeStore.requestPlaces(),
  transportStore.requestTransports(),
  statusStore.requestStatuss(),
  customerStore.requestCustomers(),
]);

const columns: IColumn[] = [
  {
    name: "id",
    val: "Время подачи",
    format: (val) => {
      return {
        id: val.id,
        orderTime: val.orderTime
          ? dayjs(val.orderTime).format("hh:mm")
          : "Маршрут",
      };
    },
  },
  {
    name: "customer",
    val: "Ответственный",
    format: (val) => customerStore.getById(val.customerId)?.subdivision,
  },
  {
    name: "departurePoint",
    val: "Место отправления",
    format: (val) => placeStore.getById(val.departurePointId)?.name,
  },
  {
    name: "destination",
    val: "Место назначения",
    format: (val) => placeStore.getById(val.destinationId)?.name,
  },
  {
    name: "transport",
    val: "Номер ТС",
    format: (val) => transportStore.getById(val.transportId)?.transportNumber,
  },
  {
    name: "status",
    val: "Статус",
    format: (val) => statusStore.getById(val.statusId)?.description,
  },
];
</script>
