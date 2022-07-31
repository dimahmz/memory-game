<template lang="pug">
Result(v-if="display")
Header
GameSetting
div.flex.justify-center 
 button.border-2.border-sky-500.py-1.px-4(class='hover:bg-sky-100') start
GameBoard

</template>

<script>
import GameSetting from './components/settingGame.vue'
import Header from './components/header.vue'
import GameBoard from './components/gameBoard.vue'
import Result from './components/result.vue'
import { mapGetters } from 'vuex'
export default {
  name:'app',
  components:{ GameSetting, Header, GameBoard, Result},
  computed: {
    ...mapGetters({ display: "get_show_result"}),
  }
  }
</script>