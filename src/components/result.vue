<template lang="pug">
.modal-bg
 .modal
  p.result(v-if:="win") you've won! score is: {{score}}
  p.result(v-else) you've lost score is: {{score}}
  .btns-conatiner.absolute.bottom-3.w-full.flex.justify-center.space-x-8
   button.btn(@click="replay()") again
   button.btn(@click="close()") close
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Result",
  computed: {
    ...mapGetters("GAME", {
      win: "get_win",
      score: "get_score",
    }),
    // computed: {
    //   win() {
    //     return this.$store.GAME.getters.get_win;
    //   },
    //   score() {
    //     return this.$store.GAME.getters.get_score;
    //   },
  },
  methods: {
    replay() {
      this.$store.dispatch("GAME/paly_again");
    },
    close() {
      this.$store.dispatch("GAME/close_model");
    },
  },
  mounted() {
    document.body.style.overflow = "hidden";
  },
  unmounted() {
    document.body.style.overflow = "auto";
  },
};
</script>

<style scoped>
.modal-bg {
  @apply overflow-hidden absolute h-screen w-full bg-slate-200 grid place-items-center;
}
.modal {
  @apply w-80 h-64 bg-slate-500 rounded border border-sky-500 relative z-50 grid place-items-center text-white;
}
.result {
  @apply text-center;
}
.btns-conatiner {
  @apply absolute bottom-3 w-full flex justify-center space-x-8;
}
.btn {
  @apply border-2 border-sky-500 py-1 px-4 hover:bg-sky-100;
}
</style>
