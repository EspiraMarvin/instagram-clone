<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        ref="video"
        class="full-width"
        autoplay
        playsinline
      />
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        @click="captureImage"
        round
        color="grey-10"
        icon="eva-camera"
        size="lg"
      />
      <q-file
        v-else
        v-model="imageUpload"
        @input="captureImageFallback"
        accept="image/*"
        label="Choose an Image"
        outlined\
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>

      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          label="Caption"
          class="col col-sm-6"
          dense
        />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          label="Location"
          class="col col-sm-6"
          dense
        >
          <template v-slot:append>
            <q-btn
              :loading="locationLoading"
              @click="getLocation"
              v-if="locationSupported"
              round
              dense
              flat
              icon="eva-navigation-2-outline"
            />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn
          unelevated
          rounded
          color="primary"
          label="Post Image"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
require('md-gum-polyfill')
export default {
  name: 'PageCamera',
  data () {
    return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now()
      },
      imageCaptured: false,
      imageUpload: [],
      hasCameraSupport: true,
      locationLoading: false
    }
  },
  computed: {
    locationSupported () {
      if ('geolocation' in navigator) return true
      return false
    }
  },
  methods: {
    initCamera () {
      navigator.mediaDevices.getUserMedia({
        video: true,
        microphone: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
        // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.hasCameraSupport = false
      })
    },
    captureImage () {
      const video = this.$refs.video
      const canvas = this.$refs.canvas
      // set the canvas height and width same as the video element
      canvas.width = video.getBoundingClientRect().width
      canvas.height = video.getBoundingClientRect().height
      const context = canvas.getContext('2d')
      // draw the image capture to the canvas starting from x and y top coordinates
      // on the canvas to the entire video width and height
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true
      this.post.photo = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
    },
    dataURItoBlob (dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1])

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length)

      // create a view into the buffer
      var ia = new Uint8Array(ab)

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], { type: mimeString })
      return blob
    },
    captureImageFallback (file) {
      this.post.photo = file
      const canvas = this.$refs.canvas
      const context = canvas.getContext('2d')

      var reader = new FileReader()
      reader.onload = event => {
        var img = new Image()
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0)
          this.imageCaptured = true
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    },
    disableCamera () {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()
      })
    },
    getLocation () {
      this.locationLoading = true
      navigator.geolocation.getCurrentPosition(position => {
        this.getCityandCountry(position)
        // eslint-disable-next-line handle-callback-err
      }, error => {
        this.locationError()
      }, { timeout: 7000 })
    },
    getCityandCountry (position) {
      const apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
      this.$axios.get(apiUrl)
        .then(result => {
          this.locationSuccess(result)
          // eslint-disable-next-line handle-callback-err
        }).catch(error => {
          this.locationError()
        })
    },
    locationSuccess (result) {
      this.post.location = result.data.city
      if (result.data.country) {
        this.post.location += `, ${result.data.country}`
      }
      this.locationLoading = false
    },
    locationError () {
      this.$q.dialog({
        title: 'Error',
        message: 'Could Not find your Location'
      })
      this.locationLoading = false
    }
  },
  mounted () {
    this.initCamera()
    console.log('navigator', navigator)
  },
  beforeDestroy () {
    if (this.hasCameraSupport) {
      this.disableCamera()
    }
  }
}
</script>

<style lang="sass">
  .camera-frame
    border: 2px solid $grey-10
    border-radius: 10px
  .constrain-more
    max-width: 600px
    margin: 0 auto

</style>
