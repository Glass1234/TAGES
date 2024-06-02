import {createStore} from 'vuex';
import {toRaw} from 'vue';
import {items, materials} from "@/src/fakeAPI";

const store = createStore({
    state() {
        return {
            count: 0,
            items: [],
            materials: [],
            oldMaterial: "",
            oldSort: "",
        };
    },
    getters: {
        getMaterials(state) {
            return toRaw(state.materials);
        },
        getItems(state) {
            return toRaw(state.items);
        },
    },
    mutations: {
        setAll(state) {
            this.commit('setItems');
            this.commit('setMaterials');
        },
        setItems(state) {
            const tmp = items;
            const favoriteArr = JSON.parse(localStorage.getItem('favoriteArr'))
            const basketArr = JSON.parse(localStorage.getItem('basketArr'))
            state.items = tmp.map(item => ({
                ...item,
                isFavorite: favoriteArr.some(fav => fav.id === item.id),
                isBasket: basketArr.some(fav => fav.id === item.id)
            }));
        },
        setMaterials(state) {
            state.materials = materials;
        },
        filterItemsByMaterial(state, material) {
            state.oldMaterial = material;
            if (material) {
                state.items = state.items.filter(item => item.material == material);
            }
        },
        sortedItemsByVal(state, type) {
            state.oldSort = type;
            let sortedItems = [...state.items];
            if (type === "max") {
                sortedItems.sort((a, b) => a.price.current_price - b.price.current_price);
            } else {
                sortedItems.sort((a, b) => b.price.current_price - a.price.current_price);
            }
            state.items = sortedItems;
        },
        applyFiltersAndSort(state) {
            this.commit('setItems');
            if (state.oldMaterial) {
                this.commit('filterItemsByMaterial', state.oldMaterial);
            }
            if (state.oldSort) {
                this.commit('sortedItemsByVal', state.oldSort);
            }
        },
        addAndRemoveFavoriteLocalStorage(state, item) {
            item.isFavorite = true;
            const favoriteArr = JSON.parse(localStorage.getItem('favoriteArr')) || []
            if (favoriteArr) {
                const index = favoriteArr.findIndex(obj => obj.id === item.id);
                if (index !== -1) {
                    favoriteArr.splice(index, 1);
                } else {
                    favoriteArr.push(item);
                }
            } else {
                favoriteArr.push(item);
            }
            localStorage.setItem('favoriteArr', JSON.stringify(favoriteArr));
            state.items = state.items.map(item => ({
                ...item,
                isFavorite: favoriteArr.some(fav => fav.id === item.id)
            }));
        },
        addAndRemoveBasketLocalStorage(state, item) {
            item.isBasket = true;
            const basketArr = JSON.parse(localStorage.getItem('basketArr')) || []
            if (basketArr) {
                const index = basketArr.findIndex(obj => obj.id === item.id);
                if (index !== -1) {
                    basketArr.splice(index, 1);
                } else {
                    basketArr.push(item);
                }
            } else {
                basketArr.push(item);
            }
            localStorage.setItem('basketArr', JSON.stringify(basketArr));
            state.items = state.items.map(item => ({
                ...item,
                isBasket: basketArr.some(fav => fav.id === item.id)
            }));
        }
    },
    actions: {
        applyFiltersAndSort({commit}) {
            commit('applyFiltersAndSort');
        },
        filterItemsByMaterial({commit, dispatch}, material) {
            commit('filterItemsByMaterial', material);
            dispatch('applyFiltersAndSort');
        },
        sortedItemsByVal({commit, dispatch}, type) {
            commit('sortedItemsByVal', type);
            dispatch('applyFiltersAndSort');
        }
    }
});

export default store;
