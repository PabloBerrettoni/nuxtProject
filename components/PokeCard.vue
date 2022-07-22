<template>
        <div class="pokeCard">
            <img id="img" :src=sprite v-on:change="bgColor"/>
            <div class="text">
                <h2 class="pokeName"> {{ name }} </h2>
                <p> {{ type1 }} </p>
                <p> {{ type2 }} </p>
                <nuxt-link :to="'/detail/' + name"> <p>See more</p> </nuxt-link>
            </div>
        </div>
</template>

<script>
    export default {
        name: 'Pokemon',
        props: ['sprite' , 'name', 'type1', 'type2'],
        created() {
            let pokeCardBG = document.querySelector('#img');
            /* for (let pokeImg of pokeCardBG) {
                switch (pokeImg) {
                case 'grass':
                    pokeCardBG.style.backgroundColor = "#4DAD5B"                        
                    break;
                case 'fire':
                    pokeCardBG.style.backgroundColor = "#bc6c25"                        
                    break;
                case 'water':
                    pokeCardBG.style.backgroundColor = "#1B53BA"                        
                    break;
                default:
                    pokeCardBG.style.backgroundColor = "#919191"   
                    break;
                }
            } */
        },
    }
</script>

<style>
    .pokeName {
        text-transform: capitalize;
    }
    .pokeCard {
        background-color: #fefae0;
        border-radius: 5%;
        border-radius: 10px;
        margin: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 350px;
    }
    .pokeCard img {
        width: 250px;
        border-radius: 5px;
    }
    .text {
        text-align: center;
    }
    @media screen and (max-width: 892px) {
        .pokeCard {
            flex-direction: row-reverse;
            min-width: 350px;
        }
        .pokeCard img {
            background-color: #bc6c25;
            border: none;
            width: 60%;
            height: 100%;
        }
        .text {
            width: 40%;
            flex-direction: column;
            margin-left: 15px;
        }
    }
</style>
