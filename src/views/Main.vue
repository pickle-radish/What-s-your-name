<template>
    <div id="mainDiv">
        <router-link :to="{name:`SelectTemp`}">
            <v-btn x-large rounded color="primary" dark>Get Start!</v-btn>
        </router-link>
    </div>
</template>

<script>
export default {
    name:'Main',
    
    // beforeRouteLeave (to, from, next) {
    //     // If the form is not dirty or the user confirmed they want to lose unsaved changes,
    //     // continue to next view
    //     if (!this.form_dirty || this.confirmLeave()){
    //     next('/')
    //     } else {
    //     // Cancel navigation
    //     next(false)
    //     }
    // },

 
    

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