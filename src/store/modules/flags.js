//  EUROPE=[],
//  ASIA=[004,],
//  SOUTH_AMERICA=[032,],

const state = () => ({
  AFRICA: [
    "012",
    "120",
    "180",
    "818",
    "213",
    "266",
    "288",
    "324",
    "404",
    "434",
  ],
  FLAGS: [],
});
const mutations = {
  ADD_FLAGS(state, flags_links) {
    state.FLAGS = flags_links;
  },
};
const getters = { get_flags: (state) => state.FLAGS };
const actions = {
  async fetch_flags({ state, dispatch }) {
    try {
      for (let key = 0; key < state.AFRICA.length; key++) {
        const flags = await fetch(
          `https://countryflagsapi.com/svg/${state.AFRICA[key]}`
        );
        state.FLAGS.push(flags);
      }
      await dispatch("shuffle_flags");
      console.log(state.FLAGS);
    } catch {
      console.log("an error occurred while fetching please refresh the page");
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
