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
                            <div style="display:flex; justify-content:center;">
                                <video class="coverid_video" autoplay loop width="80%" >
                                    <source src="@/video/dungeonVideo.mp4" type="video/mp4">
                                </video>
                            </div>
                            <div style="color:black;">
                                {{slide}}
                            </div>
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
          '구글 계정으로 로그인 후에 사용을 시작합니다.',
          'GET START 버튼을 누른 후에 사용할 이미지를 선택합니다.',
          '웹에서 제공해주는 이미지를 선택하거나 원하는 이미지 파일을 직접 사용할 수 있습니다.',
          '원하는 이미지를 선택했다면 오른쪽 도구상자에서 이미지의 크기를 조절할 수 있습니다. 단위는 mm단위로 최대 250mm까지 지정이 가능합니다.',
          `'태그'라는 텍스트를 마우스로 클릭하여 원하는 위치로 이동시킵니다.`,
          '원하는 위치에 놓았다면 오른쪽 도구상자에서 value값을 변경함으로 원하는 값을 입력해 볼 수 있습니다.',
          '태그의 개수는 최대 5개까지 원하는 만큼 늘리거나 지울 수 있습니다.',
          '글꼴 변경은 전체 태그가 동일하게 적용되며 각 태그의 크기나 굵기는 따로 적용할 수 있습니다.',
          `'tag' 부분에 현재 태그의 이름을 지정해줍니다. 지정된 이름은 엑셀파일을 만들 때 참고합니다.`,
          '원하는 양식이 완료되었다면 불러올 엑셀파일을 만들어줍니다. 엑셀 파일을 만들 때는 1번줄에 tag들의 이름을 정해주고 밑으로 입력될 값들을 넣어줍니다.',
          `엑셀파일을 저장하고 오른쪽 도구상자에서 'File input'버튼을 클릭해 엑셀 파일을 불러옵니다.`,
          `자신이 원하는 모양으로 나오는지 'TEST'버튼을 클릭해서 PDF파일을 다운받아서 확인해봅니다.`,
          `자신이 원하는대로 잘 나왔다면 'PDF'버튼을 눌러서 PDF파일을 다운 받습니다. 다운 받을 때는 다소 시간이 걸립니다.`,
          '이제 시작해 봅시다!',
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