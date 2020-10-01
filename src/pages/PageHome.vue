<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="post.imageUrl">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">t_b.a.g</q-item-label>
              <q-item-label caption>
                {{ post.location }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
          />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ prettyDateTimeAmPm(post.date) }}</div>
          </q-card-section>

        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/parallax2.jpg">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">t_b.a.g</q-item-label>
            <q-item-label caption>
              Marvin Espira
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'

export default {
  name: 'PageHome',
  data () {
    return {
      posts: [
        {
          id: 1,
          caption: 'Golden Gate Bridge',
          date: 1601479816176,
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 2,
          caption: 'Golden Gate Bridge',
          date: 1601479816176,
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 3,
          caption: 'Golden Gate Bridge',
          date: 1601479816176,
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        },
        {
          id: 4,
          caption: 'Golden Gate Bridge',
          date: 1601479816176,
          location: 'San Francisco, United States',
          imageUrl: 'https://cdn.quasar.dev/img/parallax2.jpg'
        }
      ]
    }
  },

  methods: {
    prettyDate (dd) {
      return moment(dd)
        .utc(true)
        .format('DD/MM/YYYY')
    },

    prettyDateTime (dd) {
      return moment(dd)
        .utc(true)
        .format('DD/MM/YYYY HH:mm:ss')
    },

    prettyDateTimeAmPm (dd) {
      return moment(dd)
        .utc(true)
        .format('MMMM D h:mmA')
    }
  }
}
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height: 200px
  .large-screen-only
    @media (max-width: $breakpoint-xs-max)
      display: none
    @media (min-width: $breakpoint-sm-min)
      display: block
</style>
