import {createStore} from 'vuex';
import type {MutationTree, GetterTree, ActionTree} from 'vuex';
import {toRaw} from 'vue';
import {items, materials} from "@/src/fakeAPI";

interface Item {
    id: string;
    name: string;
    code: string;
    price: {
        old_price: number;
        current_price: number;
    };
    image: {
        url: string;
    };
    material: number;
    isFavorite?: boolean;
    isBasket?: boolean;
}

interface Material {
    id: string;
    name: string;
}


interface State {
    items: Item[];
    materials: Material[];
    oldMaterial: string;
    oldSort: string;
}

type Mutations = MutationTree<State>;

type Getters = GetterTree<State, State>;

type Actions = ActionTree<State, State>;

const mutations: Mutations = {
    setAll(state) {
        mutations.setItems(state);
        mutations.setMaterials(state);
    },
    setItems(state) {
        const tmp: Item[] = (items as unknown) as Item[];
        const favoriteArr: Item[] = JSON.parse(localStorage.getItem('favoriteArr') || '[]');
        const basketArr: Item[] = JSON.parse(localStorage.getItem('basketArr') || '[]');
        state.items = tmp.map(item => ({
            ...item,
            isFavorite: favoriteArr.some(fav => fav.id === item.id),
            isBasket: basketArr.some(fav => fav.id === item.id)
        }));
    },
    setMaterials(state) {
        state.materials = materials;
    },
    filterItemsByMaterial(state, material: string) {
        state.oldMaterial = material;
        if (material) {
            state.items = state.items.filter(item => item.material == Number(material));
        }
    },
    sortedItemsByVal(state, type: string) {
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
        mutations.setItems(state);
        if (state.oldMaterial) {
            mutations.filterItemsByMaterial(state, state.oldMaterial);
        }
        if (state.oldSort) {
            mutations.sortedItemsByVal(state, state.oldSort);
        }
    },
    addAndRemoveFavoriteLocalStorage(state, item: Item) {
        item.isFavorite = true;
        const favoriteArr: Item[] = JSON.parse(localStorage.getItem('favoriteArr') || '[]');
        if (favoriteArr.length > 0) {
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
    addAndRemoveBasketLocalStorage(state, item: Item) {
        item.isBasket = true;
        const basketArr: Item[] = JSON.parse(localStorage.getItem('basketArr') || '[]');
        if (basketArr.length > 0) {
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
};

const getters: Getters = {
    getMaterials(state) {
        return toRaw(state.materials);
    },
    getItems(state) {
        return toRaw(state.items);
    },
};

const actions: Actions = {
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
};

const store = createStore({
    state() {
        return {
            items: [],
            materials: [],
            oldMaterial: "",
            oldSort: "",
        } as State;
    },
    mutations,
    getters,
    actions
});

export default store;
