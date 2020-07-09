<template>
    <div>
        <div v-if="!isLoggedIn" >
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
import cookies from 'vue-cookies'
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'
import router from '@/router/index'

export default {
    name: 'Login',

    computed:{
        ...mapGetters(['isLoggedIn'])
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
                cookies.set('login_token', token)
                // The signed-in user info.
                let user = result.user;
                cookies.set('email', user.email)
                // console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.

                firebase.firestore().collection('user').where('email', '==', user.email).get()
                .then(snapshot => {
                    if(snapshot.empty){
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
            this.$store.commit("setToken", null) 
            cookies.remove('login_token');    
            // location.pathname ='/'
            router.push('/')
        }
    }
}
</script>

<style>

</style>