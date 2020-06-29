<template>
     <v-container>
        
        <v-row style="margin-top:100px; height:350px">
        
            <v-col cols="3">
                <v-card outlined height="100%">

                </v-card>
            </v-col>
            <v-col cols="3">
                <router-link to="/custom?name=a">
                    <v-card height="100%">
                        <img class="tempImg" src="@/img/a.jpg" width="100%" height="100%" alt="">
                    </v-card>
                </router-link>
            </v-col>
            <v-col cols="3">
                <router-link to="/custom?name=b">
                    <v-card height="100%">
                        <img class="tempImg" src="@/img/b.jpg" width="100%" height="100%" alt="">
                    </v-card>
                </router-link>
            </v-col>
            <v-col cols="3">
                <v-card outlined height="100%">
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {

}
</script>

<style>
    .tempImg{
        display:block;
    }
</style>