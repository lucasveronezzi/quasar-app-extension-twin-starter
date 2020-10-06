<template>
  <div class="flex full-width" style="height: 100vh">
    <div class="row items-center justify-center full-width">
        <div class="col-xs-10 col-sm-6 col-md-5 col-lg-3 relative-position">
          <div class="absolute animation-lateral"></div>

          <img src="~assets/quasar-logo-full.svg" alt="Loading" style="width: 100%; height: auto;">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Splashscreen'
}
</script>

<style lang="sass" scoped>
@keyframes animation-slide
  0%
    transform: translateX(100%)
  50%
    transform: translateX(0%)
  100%
    transform: translateX(100%)

.animation-lateral
  width: 100%
  height: 100%
  background: linear-gradient(90deg, rgba($body-color,0.05) 0%, rgba($body-color,1) 20%, rgba($body-color,1) 80%, rgba($body-color,0.05) 100%)
  animation: animation-slide 4s linear infinite
</style>
