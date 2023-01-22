<template>
  <!-- <table class="text-center border-collapse overflow-auto h-full"> -->
  <div class="max-h-[512px]">
    <DynamicScroller
      :items="props.rows"
      :min-item-size="54"
      listTag="table"
      itemTag="tr"
      listClass="border-collapse "
    >
      <!-- <template #before>
        <th
          v-for="column of props.columns"
          :key="column.name"
          class="p-0 border border-slate-300"
        >
          {{ column.val }}
        </th>
      </template> -->
      <template v-slot="{ item, active }">
        <!-- <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="item.id"
          tag="tr"
        >
         
        </DynamicScrollerItem> -->
        <td
          v-for="key of rowsWithFn"
          :key="key"
          class="p-0 border border-slate-300"
        >
          <slot
            :name="`td-${key}`"
            :val="formatters[key]?.(item)"
          >
            {{ formatters[key]?.(item) }}
          </slot>
        </td>
      </template>
    </DynamicScroller>
  </div>

  <!-- <tr
      v-for="(row, index) of props.rows"
      :key="index"
      class="hover:bg-slate-200"
    >
      <td
        v-for="key of rowsWithFn"
        :key="key"
        class="p-0 border border-slate-300"
      >
        <slot
          :name="`td-${key}`"
          :val="formatters[key]?.(row)"
        >
          {{ formatters[key]?.(row) }}
        </slot>
      </td>
    </tr> -->
  <!-- </table> -->
</template>

<script lang="ts" setup>

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
export interface ICell {
  [x: string]: any;
}

export interface IColumn extends ICell {
  format: formatFn;
  name: string;
}

export interface ITableProps {
  columns: IColumn[];
  rows: any[];
}

export type formatFn = (val: ICell) => any;

const props = defineProps<ITableProps>();

const rowsWithFn = computed(() => props.columns.map((col) => col.name));

const formatters = computed(() =>
  Object.fromEntries(props.columns.map((col) => [col.name, col.format]))
);


</script>


<style>
/* .vue-recycle-scroller {
  display: table;
  width: 100%;
}

.vue-recycle-scroller__slot {
  display: table-row;
}

.vue-recycle-scroller__item-wrapper {
  height: 100%;
} */

.vue-recycle-scroller {
  flex: 1;
  max-height: 100%;
}
</style>