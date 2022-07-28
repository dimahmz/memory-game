<template lang="pug">
img.object-cover.block.back-card(:src='data.imgPath' :alt='data.imgAlt')
img.object-cover.block.front-card(src='/public/images/back-image.jpg' alt='back image')
  
</template>

<script>
export default {
 name:'card',
 props:['data']

}
</script>

<style>

</style>