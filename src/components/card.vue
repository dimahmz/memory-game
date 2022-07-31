<template lang="pug">
img.object-cover.block.back-card(:src='data.imgPath' :alt='data.imgAlt')
img.object-cover.block.front-card(@click.self="filpCard(index)" src='/images/back-image.jpg' alt='back image')
  
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
    ...mapGetters({ click: "get_enable_click"}),
  },
  methods: {
    filpCard(index) {
      if (this.click) this.$store.dispatch("flip_image", index);
    },
  },
};
</script>

<style></style>
