<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white text-grey-10"
      bordered
    >
      <q-toolbar class="constrain">
        <q-btn
          to="/camera"
          class="large-screen-only q-mr-xs"
          icon="eva-camera-outline"
          size="18px"
          flat
          round
          dense
        />
        <q-separator
          vertical
          spaced
        />
        <q-toolbar-title class="text-grand-hotel text-bold">
          QuasarGram
        </q-toolbar-title>
        <q-btn
          icon="eva-home-outline"
          to="/"
          class="large-screen-only q-mr-xs"
          size="18px"
          flat
          round
          dense
        />
      </q-toolbar>
    </q-header>

    <q-footer
      class="small-screen-only bg-white"
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

    <q-page-container class="bg-grey-1">
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
  .q-toolbar
    @media (min-width: $breakpoint-sm-min)
      height: 60px
  .q-toolbar__title
    font-size: 30px
    @media (max-width: $breakpoint-xs-max)
        text-align: center
  .q-footer
    .q-tab__icon
      font-size: 30px
  .constrain
    max-width: 975px
    margin: 0 auto

</style>
