<template>
  <q-page :padding="!$q.platform.is.mobile && padding" :style-fn="myTweak" :class="[ { 'flex justify-center items-center': isLoading } ]">

    <q-pull-to-refresh @refresh="refresh" icon="autorenew" v-if="$listeners.refresh && !isLoading">
      <slot name="pull-refresh"/>
    </q-pull-to-refresh>

    <div v-if="!isLoading" >
      <slot />
    </div>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]" >
      <q-btn fab icon="keyboard_arrow_up" color="primary" class="glossy"/>
    </q-page-scroller>

    <app-loading v-if="isLoading" />

  </q-page>
</template>

<script>
export default {
  name: 'AppPage',

  props: {
    padding: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      containerHeaderHight: 0
    }
  },

  mounted () {
    const elTitle = document.getElementById('twin-container-header')

    if (elTitle) {
      this.containerHeaderHight = elTitle.offsetHeight
    }
  },

  computed: {
    isLoading () {
      return this.$store.state.twin.loadingPage > 0
    }
  },

  methods: {
    myTweak (offset, height) {
      return { minHeight: `${height - offset - this.containerHeaderHight}px` }
    },

    refresh (done) {
      this.$emit('refresh', done)
    }
  }
}
</script>
