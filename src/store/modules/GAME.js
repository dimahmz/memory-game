const state = () => ({
  start: false,
  loading: false,
  seeGame: false,
  flags: [],
  score: 0,
  flipped: 0,
  chrono: 0,
  card1_index: null,
  card2_index: null,
  enable_click: true,
  win_cards: 0,
  show_result: false,
  win: false,
  error: false,
});
const mutations = {
  TOGGLE_LOADING(state) {
    state.loading = !state.loading;
  },
  START_GAME(state) {
    state.start = true;
  },
  SET_CHRONO(state, seletedTime) {
    state.chrono = seletedTime;
  },
  FLIP_UP_IMAGE(state, index) {
    state.flags[index].flip = true;
    //  console.log(state.IMAGES)
  },
  TOGGLE_AGAIN_BTN(state) {
    state.seeGame = !state.seeGame;
  },
  FLIP_DOWN_IMAGES(state) {
    state.flags[state.card1_index].flip = false;
    state.flags[state.card2_index].flip = false;
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
  get_enable_click: (state) => state.enable_click,
  get_loader: (state) => state.loading,
  get_show_result: (state) => state.show_result,
  get_start_game: (state) => state.start,
  get_time: (state) => state.chrono,
  get_score: (state) => state.score,
  get_win: (state) => state.win,
  get_show_error: (state) => state.error,
  get_see_game: (state) => state.seeGame,
};
const actions = {
  async paly_again({ state, commit }) {
    try {
      commit("TOGGLE_AGAIN_BTN");
      state.flags.length = 0;
      state.win_cards = 0;
      state.show_result = false;
      // commit("HIDE_RESULT");
      // commit("RESUME_CLICK");
      state.enable_click = true;
      await commit("CLEAR_INDEXES");
      // commit("CLEAR_SCORE");
      state.score = 0;
      state.flipped = 0;
      state.score = 0;
      state.win = false;
      state.start = false;
    } catch (err) {
      state.error = true;
      console.log(err);
    }
  },
  close_model({ state, commit }) {
    state.win_cards = 0;
    state.show_result = false;
    commit("CLEAR_INDEXES");
  },
  start_game({ commit, dispatch }, timeSelected) {
    commit("START_GAME");
    commit("SET_CHRONO", timeSelected);
    dispatch("start_chrono");
  },
  set_flags({ state, rootGetters }) {
    state.flags = rootGetters["flags/get_flags"];
  },
  start_chrono({ state }) {
    const Timer = setInterval(() => {
      state.chrono--;
      if (state.chrono === 0 || state.show_result) {
        // commit("SHOW_RESULT");
        state.show_result = true;
        // commit("STOP_CLICK");
        state.enable_click = false;
        clearInterval(Timer);
      }
      // console.log(state.chrono);
    }, 1000);
  },
  async flip_image({ commit, state, dispatch }, index) {
    await commit("FLIP_UP_IMAGE", index);
    if (state.flipped === 0) {
      state.card1_index = index;
      state.flipped++;
    } else if (state.flags[state.card1_index].id !== state.flags[index].id) {
      state.card2_index = index;
      await dispatch("comapre_cards");
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
  async comapre_cards({ state, commit, dispatch }) {
    await commit("STOP_CLICK");
    if (
      state.flags[state.card1_index].imgPathNum !==
      state.flags[state.card2_index].imgPathNum
    ) {
      setTimeout(() => {
        commit("FLIP_DOWN_IMAGES");
        commit("CLEAR_INDEXES");
        commit("RESUME_CLICK");
      }, 800);
    } else {
      commit("CLEAR_INDEXES");
      commit("RESUME_CLICK");
      commit("INC_win_cards");
      commit("INC_SCORE");
      dispatch("display_result");
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
