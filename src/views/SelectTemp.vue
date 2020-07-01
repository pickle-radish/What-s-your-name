<template>
     <v-container>
        
        <v-row style="margin-top:100px; height:350px">
        
            <v-col cols="3">
                <v-card outlined height="100%" id="addCard">
                    <div id="addDiv">+</div>
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
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'SelectTemp',
}
</script>

<style>
    .tempImg{
        display:block;
    }
    #addCard{
        display:flex;
        justify-content: center;
        align-items: center;
        
        cursor: pointer;
    }
    #addCard:hover {
        background-color: #9999;
    }
    #addDiv{
        font-size: 40px;
    
        border: 1px solid;
        width: 100px;
        height: 100px;

        text-align: center;
        line-height: 100px;
        
        border-radius: 50%;

        opacity: 0.5;

    }
</style>