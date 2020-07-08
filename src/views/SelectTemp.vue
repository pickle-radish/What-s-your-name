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
            <v-col cols="3" v-for="(path, idx) in imgPath" :key="idx">
                <router-link :to="{name:`Custom`, params:{idx, custom:false}}">
                    <v-card height="100%">
                        <img class="tempImg" :src="path" width="100%" height="100%" alt="">
                    </v-card>
                </router-link>
            </v-col>
            <!-- <v-col cols="3">
                <router-link to="/custom?name=a">
                    <v-card height="100%">
                        <img class="tempImg" src="@/img/a.jpg" width="100%" height="100%" alt="">
                    </v-card>
                </router-link>
            </v-col>
            <v-col cols="3">
                <router-link to="/custom?name=b">
                    <v-card height="100%">
                        <img class="tempImg" :src="path" width="100%" height="100%" alt="">
                    </v-card>
                </router-link>
            </v-col> -->
        </v-row>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import router from '@/router/index'
import firebase from '@/firebase/init'


export default {
    name: 'SelectTemp',
    
    computed:{
        ...mapGetters(['imgPath'])
    },
    methods:{
        ...mapActions(['inputUserImg']),
        addUserImage(event){
            let files = event.target.files;
            // FileReader support
            if (FileReader && files && files.length) {
                let fr = new FileReader();
                fr.onload = ()=> {
                    // console.log(fr.result)
                    this.$store.commit('setUserImg', fr.result)
                    // firebase.firestore().collection('user')
                    //     .add({
                    //         name: new Date().getTime(),
                    //         image: fr.result
                    //     })
                    //     .catch(err=>{
                    //         console.log(err)
                    //     })
                }
                fr.readAsDataURL(files[0]);
                // console.log(new Date().getTime())
                router.push({name:`Custom`, params:{idx:1, custom:true}})
            }else{
                alert("이미지 업로드에 실패했습니다")
            }

        },
        setImagePath(){
            let imageList=[]
            firebase.firestore().collection('templateImage').get()
            .then(async snapshot => {
                if(!snapshot.empty){
                    snapshot.forEach( doc => {
                        imageList.push(doc.data().name)
                        // require(`@/img/${this.imgId}.jpg`)
                    })
                    // console.log(imageList)

                    for(let i=0; i<imageList.length; i++){
                      
                        // firestorage 에서 이미지 받아오기
                        // let url = await firebase.storage().ref().child(`template/${imageList[i]}`).getDownloadURL()
                        this.$store.commit('addPath', require(`@/img/${imageList[i]}`))
                    }
                }
            })
            .catch(err=>{
                console.log("firebase error")
                console.log(err)
            })
            
        }

    },
    created(){
        if (this.imgPath.length==0){
            this.setImagePath()
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