import store from '~/src/store/products';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
});