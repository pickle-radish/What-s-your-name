<template>
    <v-app>
        <v-text-field :label="tagName" dense style="padding:0px" v-model="saveWidth"></v-text-field>        
    </v-app>
</template>

<script>
export default {
    name:"tag",
    data() {
        return {

        }
    },
    props:{
        tagName: String,
    }
}
</script>

<style>

</style>