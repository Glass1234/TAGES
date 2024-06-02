<template>
  <div class="selector">
    <div class="selector__name">{{ name }}</div>
    <div class="selector__select select" @click="openItems=!openItems">
      <div class="select__name">{{ selectValue.name }}</div>
      <img src="@/src/assets/icons/chevron.svg" alt=""
           :style="{ transform: openItems ? 'rotate(180deg)' : 'rotate(0deg)' }"/>
    </div>
    <div class="selector__dropdown dropdown" v-show="openItems">
      <div class="dropdown__item" :class="{'dropdown__item-select':!isSelectValue(item)}"
           v-for="item in items" :key="item.id" @click="selectItem(item)">
        <div class="dropdown__item__name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
});

interface Item {
  id: any;
  name: string;
}

const emit = defineEmits(['updateSelect']);
const openItems = ref(false);
const selectValue = reactive({});

const isSelectValue = (item: Item) => {
  return selectValue.id !== item.id;
};
const selectItem = (item: Item) => {
  if (isSelectValue(item)) {
    Object.assign(selectValue, item);
    openItems.value = false;
    emit('updateSelect', item);
  }
}
</script>

<style scoped lang="scss">
.selector {
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 771px) {
    width: 100%;
    box-sizing: border-box;
  }

  &__name {
    margin-left: 16px;
    color: $grayText;
    font-weight: 400;
    font-size: 12px;
  }

  &__select {
    width: 288px;
    cursor: pointer;
    margin-top: 6px;
    padding: 0.5rem 1rem;
    background-color: $gray;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 771px) {
      width: 100%;
      box-sizing: border-box;
    }

  }

  &__dropdown {
    position: absolute;
    z-index: 1000;
    background-color: $white;
    width: 100%;
    top: 100%;
    left: 0;
    display: flex;
    flex-direction: column;
  }
}

.select {
  &__name {
    font-size: 14px;
  }
}

.dropdown {
  &__item-select {
    background-color: $gray !important;
  }

  &__item {
    cursor: pointer;
    background-color: $white;
    font-size: 14px;

    &__name {
      padding: 10px 16px;
    }

    :hover {
      background-color: $grayHover;
    }
  }
}

.selector__select img {
  transition: transform 0.35s ease;
}
</style>