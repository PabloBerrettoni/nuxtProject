<template>
        <div class="pokeCard">
            <img :src=sprite />
            <h2 class="pokeName"> {{ name }} </h2>
            <p> {{ type1 }} </p>
            <p> {{ type2 }} </p>
            <nuxt-link :to="'/' + name"> <p>See more</p> </nuxt-link>
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
        background-color: lightblue;
        border: 1px solid black;
        margin: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 350px;
    }
    .pokeCard img {
        width: 250px;
    }
</style>
