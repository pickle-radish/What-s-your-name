<template>
    <div>
        <v-btn @click="login">로그인</v-btn>
    </div>
</template>

<script>
import firebase from '@/firebase/init'
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'
import router from '@/router/index'



export default {
    name: 'Login',

    methods: {
        login(){
            // 구글 인증 기능 추가
            console.log(firebase.firebase_)
            var provider = new firebase.firebase_.auth.GoogleAuthProvider();
            let token
            console.log("login start")
            // 인증하기
            firebase.auth().signInWithPopup(provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                token = result.credential.accessToken;
                console.log(token)
                
                this.$store.commit('setToken', token)
                // The signed-in user info.
                var user = result.user;
                
                console.log(user)		// 인증 후 어떤 데이터를 받아오는지 확인해보기 위함.
                router.push({name:`Main`})
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
        }
    }
}
</script>

<style>

</style>