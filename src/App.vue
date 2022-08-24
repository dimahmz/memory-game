<template lang="pug">
Result(v-if="display")
Header
GameSetting(v-if="!start && !loading")
Loader(v-if="loading")
GameBoard(v-if="start && !loading")
ErrorModal(v-if="showError")
//- ScoreBare(v-if="start")

</template>

<script>
import GameSetting from "./components/settingGame.vue";
import Header from "./components/header.vue";
import GameBoard from "./components/gameBoard.vue";
import Result from "./components/result.vue";
import { mapGetters } from "vuex";
import ScoreBare from "./components/scoreBare.vue";
import Loader from "./components/loader.vue";
import ErrorModal from "./components/errorModal.vue";
export default {
  name: "app",
  components: {
    GameSetting,
    Header,
    GameBoard,
    Result,
    ScoreBare,
    Loader,
    ErrorModal,
  },
  computed: {
    ...mapGetters("GAME", {
      display: "get_show_result",
      start: "get_start_game",
      loading: "get_loader",
      showError: "get_show_error",
    }),
  },
  // created() {
  //   this.$store.dispatch("flags/fetch_flags");
  // },
};
</script>
