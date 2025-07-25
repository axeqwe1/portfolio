<template>
  <div class="dropdown dropdown-end">
    <button ref="reference" @click="isOpen = !isOpen" class="btn m-1">
      <IconArrowDown />
    </button>
    <teleport to="body" v-if="isOpen">
      <ul
        ref="floating"
        class="flex flex-col gap-1 p-4 w-52 rounded-box bg-base-100 shadow max-h-[170px] overflow-auto"
        :style="{
          position: 'absolute',
          top: `${y}px`,
          left: `${x}px`,
          zIndex: 9999,
        }"
      >
        <li v-for="item in data" :key="item" class="hover:bg-base-200">
          <span class="flex flex-row items-center gap-2">
            <input
              type="checkbox"
              :checked="selected.includes(item)"
              @change="toggleCheck(item)"
              class="w-5 h-5"
              :id="item"
            />
            <label :for="item">{{ item }}</label>
          </span>
        </li>
        <li class="mt-2">
          <button @click="clear()" class="btn btn-sm">clear</button>
        </li>
      </ul>
    </teleport>
  </div>
  <!-- 
  <button class="p-3 hover:cursor-pointer">
    <IconArrowDown />
  </button> -->
</template>

<script setup lang="tsx">
import {
  IconArrowDown,
  IconArrowDownBar,
  IconArrowDownCircle,
  IconArrowDownSquare,
} from "@tabler/icons-vue";
import {
  computed,
  onBeforeUnmount,
  ref,
  useTemplateRef,
  watchEffect,
  nextTick,
} from "vue";
import { onMounted, Teleport, watch } from "vue";
import { columns } from "../MonitoringComp/column";
import {
  computePosition,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/dom";
import { onClickOutside } from "@vueuse/core";
const props = defineProps<{ column: any }>();
const valueMap = props.column.getFacetedUniqueValues();
const values = valueMap ? Array.from(valueMap.keys()) : [];
const data = ref<any[]>([]);
const checkedItems = ref<Record<string, boolean>>({});
const selected = computed(
  () => (props.column.getFilterValue() as string[]) ?? []
);
const isOpen = ref(false);
const reference = useTemplateRef<HTMLElement | null>("reference");
const floating = useTemplateRef<HTMLElement | null>("floating");
const x = ref(0);
const y = ref(0);

let cleanupAutoUpdate: (() => void) | null = null;

const updatePosition = async () => {
  if (reference.value && floating.value) {
    const { x: computedX, y: computedY } = await computePosition(
      reference.value,
      floating.value,
      {
        middleware: [offset(3), flip(), shift({ padding: 5 })],
      }
    );
    x.value = computedX;
    y.value = computedY;
  }
};
watch(isOpen, async (open) => {
  if (open) {
    await nextTick();
    await updatePosition();
    if (reference.value && floating.value) {
      cleanupAutoUpdate = autoUpdate(
        reference.value,
        floating.value,
        updatePosition
      );
    }
  } else {
    cleanupAutoUpdate && cleanupAutoUpdate();
    cleanupAutoUpdate = null;
  }
});

onBeforeUnmount(() => {
  cleanupAutoUpdate && cleanupAutoUpdate();
});
onClickOutside(floating, () => {
  isOpen.value = false;
});

watchEffect(() => {
  const valueMap = props.column?.getFacetedUniqueValues?.();
  if (valueMap) {
    data.value = Array.from(valueMap.keys());
  } else {
    data.value = [];
  }
});

// watch(
//   () => props.column?.getFacetedUniqueValues?.(),
//   (newVal) => {
//     console.log(newVal);
//   }
// );

const toggleCheck = (item: string) => {
  const next = selected.value.includes(item)
    ? selected.value.filter((v) => v !== item)
    : [...selected.value, item];
  console.log(next);
  props.column.setFilterValue(next.length ? next : undefined);
  console.log(selected);
};

const clear = () => {
  props.column.setFilterValue(undefined);
};
</script>

<style scoped></style>
