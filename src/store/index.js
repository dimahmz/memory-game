import { createStore } from "vuex";
import GAME from "./modules/GAME";
import flags from "./modules/flags";
const store = createStore({
  modules: {
    GAME,
    flags,
  },
});
export default store;
