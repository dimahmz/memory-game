<template lang="pug" >
section.my-12.flex.justify-center.space-x-12
 label time
 input(disabled v-model="time")
 label score 
 input(disabled value="00")
 
  
</template>

<script>
import { mapGetters } from 'vuex'
export default {
 name:"soreBAr",
 computed: {
    ...mapGetters({ 
      time: "get_time",
      })
}
}
</script>