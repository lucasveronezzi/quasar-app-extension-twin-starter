<template>
  <div class="flex items-center justify-center container" style="height: 100vh">
    <div class="loader">
      <span :style="{ '--i': x }" v-for="(x, i) in 20" :key="i"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplashscreenSpinner'
}
</script>

<style lang="sass" scoped>

@keyframes animateBg
  0%
    filter: hue-rotate(0deg)
  100%
    filter: hue-rotate(360deg)

@keyframes animate
  0%
    transform: scale(1)
  80%,100%
    transform: scale(0)

.container
  animation: animateBg 10s linear infinite
  .loader
    position: relative
    width: 120px
    height: 120px
    span
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      transform: rotate(calc(18deg * var(--i)))
      &::before
        content: ''
        position: absolute
        width: 12.5%
        height: 12.5%
        border-radius: 50%
        background: #00ff0a
        box-shadow: 0 0 10px #00ff0a, 0 0 20px #00ff0a, 0 0 40px #00ff0a, 0 0 60px #00ff0a, 0 0 80px #00ff0a, 0 0 100px #00ff0a
        animation: animate 2s linear infinite
        animation-delay: calc(0.1s * var(--i))
</style>
