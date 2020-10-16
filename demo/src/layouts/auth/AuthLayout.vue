<template>
  <q-layout view="lHh Lpr lFf" >
    <q-page-container class="flex full-width" style="height: 100vh">
        <q-page padding class="row items-center justify-center fit">
          <div class="col-xs-12 col-sm-8 col-md-4 col-lg-4 col-xl-2">
            <router-view />
          </div>
        </q-page>
      </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>
