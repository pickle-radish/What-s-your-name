<template>
    <div style='width:100px;'>
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
            // 인증하기
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(()=> {
            // 구글 인증 기능 추가
            let provider = new firebase.auth.GoogleAuthProvider();
            
            return firebase.auth().signInWithPopup(provider).then((result) => {
                    let token = result.credential.accessToken;
                    
                    
                    this.$store.commit('setToken', token)
                    cookies.set('login_token', token)
                    // The signed-in user info.
                    let user = result.user;
                    console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.

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
            })
            .catch(function(error) {
                console.log(error)
            });
            
        },
        logout(){
            firebase.auth().signOut()
            .then(()=>{
                this.$store.commit("setToken", null) 
                cookies.remove('login_token');
            })
            // location.pathname ='/'
            if(window.location.pathname !== '/'){
                router.push('/')
            }
        }
    }
}
</script>

<style>

</style>