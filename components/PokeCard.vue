<template>
        <div class="pokeCard">
            <img id="img" :src=sprite />
            <button v-on:click="addPokeFav(name)" class="addPokemon">star</button>
            <div class="text">
                <h4 class="pokeName"> {{ name }} </h4>
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
        data () {
            return {
                pokeFavs: {
                    pokeName: '',
                    userId: ''
                }
            }
        },
        methods: {
            async addPokeFav (name) {
                this.pokeFavs = {
                    pokeName: name,
                    userId: localStorage.getItem("userId")
                }
                console.log(this.pokeFavs)
                await this.$axios.post(`http://localhost:3001/addPokeFav`, this.pokeFavs);
            }
        },
        mounted() {
            let allPokeCards = document.querySelectorAll('.pokeCard');
            const typeColors = {
                grass: '#4DAD5B',
                fire: '#EE8130',
                water: '#1B53BA',
                bug: '#A6B91A',
                flying: '#A98FF3',
                poison: '#A33EA1',
                electric: '#F7D02C',
                ground: '#E2BF65',
                fairy: '#D685AD',
                fighting: '#C22E28',
                psychic: '#F95587',
                rock: '#B6A136',
                ghost: '#735797',
                ice: '#96D9D6',
                normal: '#A8A77A',
                dragon: '#6F35FC'
            };
            for (let pokeCardAvailable of allPokeCards) {
                let type = pokeCardAvailable.lastChild.childNodes[2].innerText;
                if (typeColors[type]) {
                    pokeCardAvailable.firstChild.style.backgroundColor = typeColors[type];
                } else {
                    pokeCardAvailable.firstChild.style.backgroundColor = '#FFFFFF';
                };
            };
        }
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
        background-color: #A8A77A;
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
            background-color: #A8A77A;
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
