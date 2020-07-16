<template>
    <div class="text-center">
        <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn text class="font-weight-light grey--text" v-bind="attrs" v-on="on" >내 이름표</v-btn>
        </template>
        <v-list>
            <v-list-item
            v-for="(item, idx) in myList"
            :key="idx"
            @click="selectImage(idx)"
            style="padding-right: 0"
            >
                <v-list-item-title>
                    {{ item.title }}
                </v-list-item-title>
                <v-btn class="mx-2" fab dark x-small text right color="error" @click="removeItem(idx)">
                    <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
            </v-list-item>
        </v-list>
        </v-menu>
  </div>
</template>

<script>
import firebase from '@/firebase/init'
import {mapGetters, mapMutations} from 'vuex'
import router from '@/router/index'
import cookies from 'vue-cookies'

export default {
    name: 'Login',
    data(){
        return{
            // myList: JSON.parse(cookies.get('myList')),
        }
    },
    computed: mapGetters(['email', 'myList']),
    methods:{
        ...mapMutations(['setTags', 'setFont', 'setUserImg', 'setSaveWidth', 'setSaveHeight']),
        getMyList(){
            this.$store.commit('resetMyList')
            firebase.firestore().collection('saveList').where('email', '==', this.email).get()
            .then(snapshot => {
                if(!snapshot.empty){
                    snapshot.forEach( doc => {
                        console.log(doc.data())
                        // this.$store.commit('setMyList', doc.data())
                        // this.myList.push(doc.data())
                        this.$store.commit('setMyList', doc.data())
                        cookies.set('myList', JSON.stringify(this.myList))
                    })

                    // for(let i=0; i<imageList.length; i++){
                        
                        //     // firestorage 에서 이미지 받아오기
                    //     // let url = await firebase.storage().ref().child(`template/${imageList[i]}`).getDownloadURL()
                    //     this.$store.commit('addPath', require(`@/img/${imageList[i]}`))
                    // }
                    
                }
                    
            })
            .catch(err=>{
                console.log("firebase error")
                console.log(err)
            })
        },
        selectImage(idx){
            this.setUserImg(this.myList[idx].image)
            this.setTags(this.myList[idx].tags)
            this.setFont(this.myList[idx].selectFont)
            this.setSaveWidth(this.myList[idx].size.width)
            this.setSaveHeight(this.myList[idx].size.height)
            router.push({name:`Custom`, params:{custom:true}})
        },
        removeItem(){
            
        }
    },
    
    created(){
        if(!this.myList){
            console.log("my List is null")
            this.getMyList()
        }
    }
    
}
</script>

<style>

</style>