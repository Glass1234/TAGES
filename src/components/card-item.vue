<template>
  <div class="item font-SF_UI">
    <div class="item__content content">
      <client-only>
        <img :src="getImageUrl(`../assets${item.image.url}`)"
             :alt="item.name" class="content__img">
      </client-only>
      <div class="info">
        <span class="info__code">{{ item.code }}</span>
        <span class="info__name">{{ item.name }}</span>
        <div class="info__nav nav">
          <div class="nav__price price">
            <span v-if="item.price.old_price" class="price__old">{{ formatPrice(item.price.old_price) }}₽</span>
            <span class="price__actual">{{ formatPrice(item.price.current_price) }}₽</span>
          </div>
          <div class="nav__buttons">
            <button @click="addAndRemoveBasket(item)">
              <img
                  :src="getImageUrl(item.isBasket ? '../assets/icons/circle-checked.svg': '../assets/icons/basket.svg')"
                  :alt="item.isBasket ? 'remove basket':'add basket'">
            </button>
            <button @click="addAndRemoveFavorite(item)">
              <img :src="getImageUrl(item.isFavorite ? '../assets/icons/heartRed.svg': '../assets/icons/heart.svg')"
                   :alt="item.isFavorite ? 'remove favorite':'add favorite'">
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="item.price.old_price" class="item__discount font-SF_Pro">Скидка</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
});
const emit = defineEmits(['addAndRemoveBasket', 'addAndRemoveFavorite']);

const formatPrice = (price: number) => {
  return Math.ceil(price);
}

const getImageUrl = (name: string) => {
  return new URL(name, import.meta.url).href
}

const addAndRemoveBasket = (item: object) => {
  emit('addAndRemoveBasket', item);
}
const addAndRemoveFavorite = (item: object) => {
  emit('addAndRemoveFavorite', item);
}

</script>

<style scoped lang="scss">
.item {
  flex-grow: 1;
  border: 1px solid $grayBorder;
  padding: 10px 12px;
  height: 332px;
  position: relative;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__discount {
    position: absolute;
    top: 8px;
    left: 0;
    background-color: $red;
    color: $white;
    font-size: 14px;
    font-weight: 500;
    padding: 5px 16px;
  }
}

.info {
  display: flex;
  flex-direction: column;

  &__code {
    font-size: 10px;
    color: $grayTextCard;
  }

  &__name {
    font-size: 16px;
    color: $black;
    font-weight: 600;
    margin-top: 6px;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
  }
}

.price {
  display: flex;
  gap: 10px;
  font-size: 16px;
  font-weight: 400;

  &__old {
    color: $grayTextCard;
    text-decoration-line: line-through;
  }

  &__actual {
    font-weight: 600;
  }
}

.nav {
  align-items: center;

  &__buttons {
    display: flex;
    gap: 10px
  }
}

.content {
  height: 100%;

  &__img {
    margin: 0 auto;
    width: 238px;
    height: 237px;
  }
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
}
</style>