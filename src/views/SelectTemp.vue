<template>
     <v-container>
        
        <v-row style="margin-top:100px; height:350px">
        
            <v-col cols="3">
                <v-card outlined height="100%" id="addCard">
                    <div id="addDiv">+</div>
                    <input
                        id="addImgInput"
                        type="file" 
                        accept="image/*"
                        @change="addUserImage"
                        name="userImg"
                        >
                </v-card>
            </v-col>
            <v-col cols="3">
                <router-link to="/custom?name=a">
                    <v-card height="100%">
                        <img class="tempImg" src="@/img/a.jpg" width="100%" height="100%" alt="">
                    </v-card>
                </router-link>
            </v-col>
            <v-col cols="3">
                <router-link to="/custom?name=b">
                    <v-card height="100%">
                        <img class="tempImg" src="@/img/b.jpg" width="100%" height="100%" alt="">
                    </v-card>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import router from '@/router/index'


export default {
    name: 'SelectTemp',

    computed:{
        ...mapGetters([])
    },
    methods:{
        ...mapActions(['inputUserImg']),
        addUserImage(event){
            let files = event.target.files;
            // FileReader support
            if (FileReader && files && files.length) {
                let fr = new FileReader();
                fr.onload = ()=> {
                    this.$store.commit('setImgPath', fr.result)
                }
                fr.readAsDataURL(files[0]);
                router.push(`/custom?customImg=true`)
            }else{
                alert("이미지 업로드에 실패했습니다")
            }

        }
    }
}
</script>

<style>
    .tempImg{
        display:block;
    }
    #addCard{
        display:flex;
        justify-content: center;
        align-items: center;
    }
    #addCard:hover {
        background-color: #9999;
    }
    #addImgInput{
        position: absolute;
    
        width:100%;
        height:100%;

        cursor: pointer;

        opacity: 0;
    }
    #addDiv{
        font-size: 40px;
    
        border: 1px solid;
        width: 100px;
        height: 100px;

        text-align: center;
        line-height: 100px;
        
        border-radius: 50%;

        opacity: 0.3;

    }
</style>