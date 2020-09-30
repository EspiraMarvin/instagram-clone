<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-10"
      bordered
    >
      <q-toolbar>
        <q-btn flat round icon="eva-camera-outline"
               size="18px" dense to="/camera"
               class="large-screen-only"
        />
        <q-toolbar-title class="text-grand-hotel text-bold">
          QuasarGram
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-footer
      class="bg-white small-screen-only"
      bordered
    >
        <q-tabs
          active-color="primary"
          class="text-grey-10"
          indicator-color="transparent"
        >
          <q-route-tab
            icon="eva-home-outline"
            to="/"
            class="footer-icons"
          />
          <q-route-tab
            icon="eva-camera-outline"
            to="/camera"
            class="footer-icons"
          />
        </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style lang="sass">
  .q-toolbar__title
    text-align: center
    font-size: 30px
  .q-footer
    .q-tab__icon
      font-size: 30px
</style>
