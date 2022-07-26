<template  lang="pug">
div.card-container
 div.card.transform-3d
  img(src="/images/back-image.jpg").front-card.backface-hidden
  img(src="/images/mauritius-image.jpg").back-card.backface-hidden

</template>

<script>
export default {
  name:'app',
  
  }

</script>
