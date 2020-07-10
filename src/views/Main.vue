<template>
    <div id="mainDiv">
        <router-link :to="{name:`SelectTemp`}">
            <v-btn x-large rounded color="primary" dark>Get Start!</v-btn>
        </router-link>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'Main',

    computed:{
        ...mapGetters(['isLoggedIn'])
    },

}
</script>

<style>
    #mainDiv{
        width:100%;
        height:100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>