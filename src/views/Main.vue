<template>
    <div id="mainDiv">
        <router-link :to="{name:`Login`}">
            <v-btn x-large rounded>Login</v-btn>
        </router-link>
        <router-link :to="{name:`SelectTemp`}">
            <v-btn x-large rounded color="primary" dark>Get Start!</v-btn>
        </router-link>
    </div>
</template>

<script>
export default {
    name:'Main',

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