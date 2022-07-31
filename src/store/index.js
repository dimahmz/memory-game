import { createStore } from "vuex";
const store = createStore({
  state: {
    start: false,
    IMAGES: [],
    flipped: 0,
    chrono: 60,
    card1_index: null,
    card2_index: null,
    enable_click: true,
    win_cards: 0,
    show_result: false,
  },
  mutations: {
    START_GAME(state) {
      state.start = true;
    },
    ADD_IMAGES(state, imgs_array) {
      state.IMAGES = imgs_array;
      //  console.log(state.IMAGES)
    },
    SET_CHRONO(state,seletedTime){
      state.chrono=seletedTime
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
    SHOW_RESULT(state){
      state.show_result=true
    },
    STOP_CLICK(state){
      state.enable_click=false
    },
    RESUME_CLICK(state){
      state.enable_click=true
    }
  },
  getters: {
    get_images: (state) => state.IMAGES,
    get_enable_click: (state) => state.enable_click,
    get_show_result: (state) => state.show_result,
    get_start_game: (state) => state.start,
    get_time: (state) => state.chrono,
  },
  actions: {
    start_game({ commit, dispatch },timeSelected) {
      commit("START_GAME");
      commit("SET_CHRONO",timeSelected)
      dispatch("start_chrono");
    },
    start_chrono({ state,commit}) {
      const Timer = setInterval(() => {
        state.chrono--;
        if (state.chrono === 0 || state.show_result) {
          commit("SHOW_RESULT")
          clearInterval(Timer);
          commit("STOP_CLICK")
        }
      }, 1000);
    },
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
    async display_result({ state,commit }) {
      if (state.win_cards === 10){
        commit("SHOW_RESULT")
        return true
      } 
    },
    comapre_cards({ state, commit, dispatch }) {
      if (
        state.IMAGES[state.card1_index].imgPath !==
        state.IMAGES[state.card2_index].imgPath
      ) {
        commit('STOP_CLICK')
        setTimeout(() => {
          commit("FLIP_DOWN_IMAGES");
          commit('RESUME_CLICK')
          commit("CLEAR_INDEXES");
        }, 900);
      } else {
        state.win_cards++;
        commit("CLEAR_INDEXES");
        dispatch("display_result");
      }
    },
  },
});
export default store;
