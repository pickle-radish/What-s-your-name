<template>
<!-- <div class="navBar"> -->
    <v-toolbar flat color="white" dense >
        <v-container>
            <v-toolbar-title class="text-uppercase grey--text">
                <router-link to="/" tag="span" id="mainLink">
                    <span class="font-weight-light">Easy Name Card</span>
                </router-link>
            </v-toolbar-title>
        </v-container>
    </v-toolbar>
<!-- </div> -->
</template>

<script>
export default {
    name:'navBar',
}
</script>

<style>
    #mainLink:hover{
        cursor: pointer;
    }
    
</style>