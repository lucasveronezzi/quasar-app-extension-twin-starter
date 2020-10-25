<template>
  <q-card v-bind="$attrs" id="twin-container-header" class="q-px-lg q-py-md no-border-radius" style="z-index: 100" flat>
    <div class="text-h5 text-weight-light text-blue-black q-mb-sm">{{ $route.meta.title }}
    </div>

    <q-breadcrumbs class="breadcrumbs text-primary" v-if="!noBreadcrumb">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el
        v-for="(route, index) in breadcrumbs"
        :key="index"
        :label="route.title"
        :icon="route.icon"
        :to="route.path"
        exact-active-class="text-weight-medium"
      />
    </q-breadcrumbs>
  </q-card>
</template>

<script>
export default {
  name: 'TPageHeader',

  props: {
    noBreadcrumb: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    breadcrumbs () {
      if (this.$twin.routerNested) {
        return this.$twin.routerNested.history
      } else {
        return this.$route.matched.map((value, index, array) => {
          if (
            index === 0 ||
            value.regex.source !== array[index - 1].regex.source
          ) {
            return {
              title: value.meta.breadcrumb || value.meta.title,
              path: index === 0 ? '/' : value.path,
              icon: value.meta.icon
            }
          }

          return null
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.breadcrumbs
  font-size .875rem
</style>
