<template>
<!-- <div class="navBar"> -->
    <v-toolbar flat dense style="background-color: rgba(0,0,0,0);">
        <v-container id="navbarContainer">
            <v-toolbar-title class="text-uppercase grey--text">
                <router-link to="/" tag="span" id="mainLink">
                    <span class="font-weight-light">Easy Name Card</span>
                </router-link>
            </v-toolbar-title>

            <router-link :to="{name:`MyList`}" tag="span">
                <div>
                    <v-btn text class="font-weight-light grey--text">내 목걸이들</v-btn> 
                </div>
            </router-link>

            <Login />
        </v-container>
    </v-toolbar>
<!-- </div> -->
</template>

<script>
import Login from '@/components/Login.vue'
export default {
    name:'navBar',
    components:{
        Login,
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