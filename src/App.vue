<template lang="pug">
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
export default {
  name:'app',
  components:{GameSetting,Header,GameBoard}
  }

</script>
