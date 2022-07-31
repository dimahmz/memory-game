<template lang="pug">
Result(v-if="display===false")
Header
GameSetting(v-if="!start")
ScoreBare(v-if="start")
GameBoard(v-if="start")

</template>

<script>
import GameSetting from './components/settingGame.vue'
import Header from './components/header.vue'
import GameBoard from './components/gameBoard.vue'
import Result from './components/result.vue'
import { mapGetters } from 'vuex'
import ScoreBare from './components/scoreBare.vue'
export default {
  name:'app',
  components:{ GameSetting, Header, GameBoard, Result, ScoreBare },
  computed: {
    ...mapGetters({ 
      display: "get_show_result",
      start: "get_start_game"
      }),
  }
  }
</script>