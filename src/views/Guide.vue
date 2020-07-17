<template>
    <div style="display:flex; align-items: center">
        <v-container>
            <v-carousel
                height="800"
                hide-delimiter-background
            >
                <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i"
                    >
                    <v-sheet
                        id="slideSheet"
                        height="100%"
                    >
                        <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                        >
                            <!-- <div class="display-3">{{ slide }} Slide</div> -->
                            <video class="coverid_video" autoplay loop width="80%" >
                                <source src="@/video/dungeonVideo.mp4" type="video/mp4">
                            </video>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
            </v-carousel>
            <!-- <video class="coverid_video" autoplay loop>
                <source src="@/video/dungeonVideo.mp4" type="video/mp4">
            </video> -->
        </v-container>
    </div>
</template>

<script>

export default {
    name:'Guide',
    data () {
      return {
        items: [
          {
            src: '@/video/dungeonVideo.mp4',
          },
        ],
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },


}
</script>

<style>
    #slideSheet{
        background-color: rgba( 0, 0, 0, 0 );  
    }
</style>