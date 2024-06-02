<template>
  <div class="main">
    <div class="main__container">
      <div class="main__breadcrumb breadcrumb font-SF_UI">
        <span class="breadcrumb__item">Главная</span>
        <span class="breadcrumb__separator">/</span>
        <span class="breadcrumb__item">Системы хранения</span>
        <span class="breadcrumb__separator">/</span>
        <span class="breadcrumb__item">Комплекты стеллажных систем</span>
      </div>
      <h1 class="main__title title font-SF_Pro">Комплекты стеллажных систем</h1>
      <div class="main__selectors selectors font-SF_Pro">
        <custom-selector :name="sorted.name" :items="sorted.items"
                         @updateSelect="updatePrice"/>
        <custom-selector :name="materials.name" :items="materials.items"
                         @updateSelect="updateMaterial"/>
      </div>
      <div class="main__cards">
        <template v-for="card in cards" :key="card.id">
          <card-item :item="card"
                     @addAndRemoveBasket="addAndRemoveBasket"
                     @addAndRemoveFavorite="addAndRemoveFavorite"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, toRaw} from 'vue';
import {useStore} from 'vuex';
import CustomSelector from "@/src/components/custom-selector.vue";
import CardItem from "@/src/components/card-item.vue";

const store = useStore();

const materials = computed(() => {
  const tmp = store.getters.getMaterials
  return {
    name: "Материал",
    items: [...tmp]
  }
})
const sorted = computed(() => {
  return {
    name: "Сортировать по:",
    items: [
      {name: "Цена по убыванию", id: "1"},
      {name: "Цена по возрастанию", id: "2"},
    ]
  }
})
const cards = computed(() => {
  return [...store.getters.getItems];
})

const updatePrice = (val: any) => {
  store.dispatch('sortedItemsByVal', val.id == 1 ? "min" : "max");
}
const updateMaterial = (val: any) => {
  store.dispatch('filterItemsByMaterial', val.id);
}

const addAndRemoveFavorite = (item: object) => {
  store.commit("addAndRemoveFavoriteLocalStorage", item);
}
const addAndRemoveBasket = (item: object) => {
  store.commit("addAndRemoveBasketLocalStorage", item);
}

onMounted(() => {
  store.commit("setAll");
});
</script>

<style lang="scss">
.main {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 32px 0;
  box-sizing: border-box;

  &__container {
    width: 88%;
    display: flex;
    flex-direction: column;
  }

  &__breadcrumb {
    display: flex;
    gap: 0 14px;
    color: $grayBreadcrumb;
    font-weight: 400;
    font-size: 16px;
  }

  &__title {
    font-weight: 600;
    font-size: 34px;
    line-height: 48px;
    margin-top: 32px;
  }

  &__selectors {
    display: flex;
    flex-wrap: wrap;
    gap: 50px 24px;
    margin-top: 32px;
  }

  &__cards {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px 48px;
    justify-content: start;
    @media (max-width: 1370px) and (min-width: 700px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

.breadcrumb {
  &__item {
    cursor: pointer;
    color: $grayBreadcrumb;

    &:last-child {
      color: $black;
      cursor: default;
    }
  }

  &__separator {
    cursor: default;
  }
}

body {
  background-color: $white;
}

.font-SF_UI {
  font-family: "SF_UI", sans-serif;
}

.font-SF_Pro {
  font-family: "SF_Pro", sans-serif;
}

img {
  user-select: none;
}
</style>