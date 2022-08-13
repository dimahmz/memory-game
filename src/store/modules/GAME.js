const state = () => ({
  start: false,
  score: 0,
  IMAGES: [],
  flipped: 0,
  chrono: 6,
  card1_index: null,
  card2_index: null,
  enable_click: true,
  win_cards: 0,
  show_result: false,
  win: false,
});
const mutations = {
  START_GAME(state) {
    state.start = true;
  },
  ADD_IMAGES(state, imgs_array) {
    state.IMAGES = imgs_array;
    //  console.log(state.IMAGES)
  },
  SET_CHRONO(state, seletedTime) {
    state.chrono = seletedTime;
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
  CLEAR_SCORE(state) {
    state.score = 0;
  },
  HIDE_RESULT(state) {
    state.show_result = false;
  },
  SHOW_RESULT(state) {
    state.show_result = true;
  },
  STOP_CLICK(state) {
    state.enable_click = false;
  },
  RESUME_CLICK(state) {
    state.enable_click = true;
  },
  INC_win_cards(state) {
    state.win_cards++;
  },
  INC_SCORE(state) {
    state.score += 10;
  },
};
const getters = {
  get_images: (state) => state.IMAGES,
  get_enable_click: (state) => state.enable_click,
  get_show_result: (state) => state.show_result,
  get_start_game: (state) => state.start,
  get_time: (state) => state.chrono,
  get_score: (state) => state.score,
  get_win: (state) => state.win,
};
const actions = {
  async paly_again({ state, commit, dispatch }) {
    try {
      state.IMAGES.map((img) => (img.flip = false));
      state.start = false;
      state.win_cards = 0;
      commit("HIDE_RESULT");
      commit("RESUME_CLICK");
      commit("CLEAR_INDEXES");
      commit("CLEAR_SCORE");
      await dispatch("shuffle_images");
      state.flipped = 0;
      state.score = 0;
      state.win = false;
    } catch (err) {
      console.log(err);
    }
  },
  close_model({ state, commit }) {
    state.win_cards = 0;
    commit("HIDE_RESULT");
    commit("CLEAR_INDEXES");
  },
  start_game({ commit, dispatch }, timeSelected) {
    commit("START_GAME");
    commit("SET_CHRONO", timeSelected);
    dispatch("start_chrono");
  },
  start_chrono({ state, commit }) {
    const Timer = setInterval(() => {
      state.chrono--;
      if (state.chrono === 0 || state.show_result) {
        commit("SHOW_RESULT");
        commit("STOP_CLICK");
        clearInterval(Timer);
      }
    }, 1000);
  },
  async fetch_images({ commit, dispatch }) {
    try {
      const Cards_object = await fetch("Data/data.json");
      const Cards = await Cards_object.json();
      await commit("ADD_IMAGES", Cards.IMAGES);
      await dispatch("shuffle_images");
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
  display_result({ state, commit }) {
    if (state.win_cards === 10) {
      state.win = true;
      //bonus if the user won before time was up
      state.score += state.chrono * 10;
      commit("SHOW_RESULT");
    }
  },
  comapre_cards({ state, commit, dispatch }) {
    commit("STOP_CLICK");
    if (
      state.IMAGES[state.card1_index].imgPath !==
      state.IMAGES[state.card2_index].imgPath
    ) {
      setTimeout(() => {
        commit("FLIP_DOWN_IMAGES");
        commit("RESUME_CLICK");
        commit("CLEAR_INDEXES");
      }, 900);
    } else {
      commit("CLEAR_INDEXES");
      commit("RESUME_CLICK");
      commit("INC_win_cards");
      commit("INC_SCORE");
      dispatch("display_result");
    }
  },
  shuffle_images({ state }) {
    for (let i = state.IMAGES.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * i);
      let temp = state.IMAGES[i];
      state.IMAGES[i] = state.IMAGES[random];
      state.IMAGES[random] = temp;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
