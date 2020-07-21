<template>
    <div id="mainDiv">
        <router-link :to="{name:`Manual`}" tag="span" class="mainBtn">
            <v-btn x-large rounded width=150>How to?</v-btn>
            <!-- <v-btn x-large rounded width=150 style="text-transform: none">How to?</v-btn> -->
        </router-link>
        <router-link :to="{name:`SelectTemp`}" tag="span" class="mainBtn">
            <v-btn x-large rounded color="primary" width=150>Get Start!</v-btn>
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
    .mainBtn{
        margin:10px;
    }
    
</style>