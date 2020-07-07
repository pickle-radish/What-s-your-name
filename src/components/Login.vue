<template>
    <div>
        <div v-if="token == `logout`" >
            <v-btn text @click="login" class="font-weight-light grey--text">로그인</v-btn> 
        </div>
        <div v-else>
            <v-btn text @click="logout" class="font-weight-light grey--text">로그아웃</v-btn>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

import firebase from '@/firebase/init'
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'
// import router from '@/router/index'

export default {
    name: 'Login',

    computed:{
        ...mapGetters(['token'])
    },
    methods: {
        login(){
            // 구글 인증 기능 추가
            // console.log(firebase)
            let provider = new firebase.auth.GoogleAuthProvider();
            let token
            // 인증하기
            firebase.auth().signInWithPopup(provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                token = result.credential.accessToken;
                // console.log(token)
                
                this.$store.commit('setToken', token)
                // The signed-in user info.
                let user = result.user;
                // console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.

                firebase.firestore().collection('user').where('email', '==', user.email).get()
                .then(snapshot => {
                    if(!snapshot.empty){
                        snapshot.forEach(doc => {
                        
                            console.log(doc.data())
                            // this.todos.push({
                                // id: doc.id,
                            // content: doc.data().content,
                            // isCompleted: doc.data().isCompleted
                            // })
                        })
                    }else{
                        firebase.firestore().collection('user')
                        .add({
                            email:user.email
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
                
                // router.push({name:`Main`})
            // ...
            }).catch(function(error) {
                // Handle Errors here.
                console.log("",error.code);
                console.log(error.message);

                // The email of the user's account used.
                console.log(error.email);

                // The firebase.auth.AuthCredential type that was used.
                console.log(error.credential);
                // ...
            });
        },
        logout(){
            this.$store.commit("setToken", 'logout')
        }
    }
}
</script>

<style>

</style>