<template lang="pug">
img.object-cover.block.back-card(:src='data.imgPath' :alt='data.imgAlt')
img.object-cover.block.front-card( @click="filpCard()" src='/images/back-image.jpg' alt='back image')
</template>



<script>
import { mapGetters } from "vuex";
export default {
  name: "card",
  props: {
    index: Number,
    data: Object,
  },
  computed: {
    ...mapGetters({ enableClick: "get_enable_click"}),
  },
  methods: {
      filpCard(){
        if (this.enableClick) this.$store.dispatch("flip_image",this.index);
      }
  },
}
</script>

<style></style>
