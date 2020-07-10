<template>
    <div>
        내 목걸이들
    </div>
</template>

<script>
import firebase from '@/firebase/init'


export default {
    name: 'Login',
    
    
    methods : {
        checkId(){
            let user = firebase.auth().currentUser
            // console.log(firebase)
            if (user) {
                console.log(user.email)
            } else {
            // No user is signed in.
                console.log('logout')
            }

            // firebase.auth().onAuthStateChanged((user) => {
            //     if (user) {
            //         // User is signed in.
            //         console.log(user)
            //     } else {
            //         // No user is signed in.
            //         console.log('logout')
            //     }
            // });

        }
    },
    created() {
        this.checkId()

    }

    
}
</script>

<style>

</style>