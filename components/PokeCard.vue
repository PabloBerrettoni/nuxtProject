<template>
        <div class="pokeCard">
            <img :src=sprite />
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
        background-color: #bc6c25;
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
