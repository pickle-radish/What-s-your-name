<template>
<!-- <div class="navBar"> -->
    <v-toolbar flat dense style="background-color: rgba(0,0,0,0);">
        <v-container id="navbarContainer">
            <v-toolbar-title class="text-uppercase grey--text">
                <router-link to="/" tag="span" id="mainLink">
                    <span class="font-weight-light">Easy Name Card</span>
                </router-link>
            </v-toolbar-title>

            
            <div style="display:flex;">
                <v-btn text class="font-weight-light grey--text">가이드</v-btn>
                <MyList v-if="isLoggedIn"/>
                <Login />
            </div>
        </v-container>
    </v-toolbar>
<!-- </div> -->
</template>

<script>
import Login from '@/components/Login.vue'
import MyList from '@/components/MyList.vue'
import {mapGetters} from 'vuex'


export default {
    name:'navBar',
    components:{
        Login,
        MyList,
    },
    computed:{
        ...mapGetters(['isLoggedIn'])
    }
}
</script>

<style>
    #mainLink:hover{
        cursor: pointer;
    }
    #navbarContainer{
        display:flex;
        justify-content: space-between;
    }
    
</style>