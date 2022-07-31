import { createStore } from "vuex";
const store = createStore({
  state: {
    IMAGES: [],
    flipped: 0,
    card1_index: null,
    card2_index: null,
    enable_click: true,
    win_cards: 0,
    show_result: false,
  },
  mutations: {
    ADD_IMAGES(state, imgs_array) {
      state.IMAGES = imgs_array;
      //  console.log(state.IMAGES)
    },
    FLIP_UP_IMAGE(state, index) {
      state.IMAGES[index].flip = true;
      //  console.log(state.IMAGES)
    },
    FLIP_DOWN_IMAGES(state) {
      state.IMAGES[state.card1_index].flip = false;
      state.IMAGES[state.card2_index].flip = false;
    },

    CLEAR_INDEXES(state) {
      state.card1_index = null;
      state.card2_index = null;
    },
  },
  getters: {
    get_images: (state) => state.IMAGES,
    get_enable_click: (state) => state.enable_click,
    get_show_result: (state) => state.show_result,
  },
  actions: {
    async fetch_images({ commit }) {
      try {
        const Cards_object = await fetch("Data/data.json");
        const Cards = await Cards_object.json();
        commit("ADD_IMAGES", Cards.IMAGES);
      } catch (error) {
        console.log(error);
      }
    },
    flip_image({ commit, state, dispatch }, index) {
      commit("FLIP_UP_IMAGE", index);
      if (state.flipped === 0) {
        state.card1_index = index;
        state.flipped++;
      } else {
        state.card2_index = index;
        dispatch("comapre_cards");
        state.flipped = 0;
      }
    },
    display_result({state}) {
      console.log(state.win_cards)
      if(state.win_cards===10)
          state.show_result=true
    },
    comapre_cards({ state, commit, dispatch }) {
      if (
        state.IMAGES[state.card1_index].imgPath !==
        state.IMAGES[state.card2_index].imgPath
      ) {
        state.enable_click = false;
        setTimeout(() => {
          commit("FLIP_DOWN_IMAGES");
          state.enable_click = true;
          commit("CLEAR_INDEXES");
        }, 900);
      } else {
        state.win_cards++;
        console.log(state.win_cards)
        commit("CLEAR_INDEXES");
        dispatch("display_result");
      }
    },
  },
});
export default store;
