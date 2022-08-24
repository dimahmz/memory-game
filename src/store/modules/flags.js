//  EUROPE=[],
//  ASIA=[004,],
//  SOUTH_AMERICA=[032,],

const state = () => ({
  continents: [
    //
    ["012", "120", "180", "818", "504", "266", "288", "324", "404", "434"],
    //  EUROPE
    ["056", "100", "620", "276", "380", "528", "616", "752", "756", "792"],
    //  SOUTH_AMERICA
    ["032", "076", "152", "170", "068", "218", "328", "604", "600", "858"],
  ],
  FLAGS: [],
});
const mutations = {
  // SET_FLAGS(rootState) {
  //   console.log(rootState.GAME.flags);
  // },
};
const getters = { get_flags: (state) => state.FLAGS };
const actions = {
  async fetch_flags({ state, dispatch, commit, rootState }, INDEX) {
    console.log(rootState.GAME.loading);
    await commit("GAME/TOGGLE_LOADING", null, { root: true });
    try {
      state.FLAGS.length = 0;
      for (let key = 0; key < state.continents[INDEX].length; key++) {
        //duplicate the flags twice
        await state.FLAGS.push(
          { flip: false, imgPathNum: state.continents[INDEX][key], id: key },
          {
            flip: false,
            imgPathNum: state.continents[INDEX][key],
            id: key + 30,
          }
        );
      }
      await dispatch("shuffle_flags");
      await dispatch("GAME/set_flags", null, { root: true });
      setTimeout(() => {
        commit("GAME/TOGGLE_LOADING", null, { root: true });
      }, 500);
    } catch (err) {
      rootState.GAME.error = true;
      console.log(err);
    }
  },

  shuffle_flags({ state }) {
    for (let i = state.FLAGS.length - 1; i > 0; i--) {
      let random = Math.floor(Math.random() * i);
      let temp = state.FLAGS[i];
      state.FLAGS[i] = state.FLAGS[random];
      state.FLAGS[random] = temp;
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
