<template>
        <div class="pokeCard">
            <div class="img-button-container">
                <img id="img" :src=sprite />
                <img src="../assets/images/pokeball.svg" @click="addPokeFav(name, $event);" class="addPokemon" :class="{ 'pokeFav': isPokeFav }" id="pokePng" />
            </div>
            <div class="text">
                <h4 class="pokeName"> {{ name }} </h4>
                <p> {{ type1 }} </p>
                <p> {{ type2 }} </p>
                <nuxt-link :to="'/detail/' + name"> <p>See more</p> </nuxt-link>
            </div>
        </div>
</template>

<script>
    import Cookies from 'js-cookie';
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
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE'
    };
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
            async addPokeFav (name, event) {
                // check if the user is logged in to make the request to the backend
                if (!Cookies.get("jwt")) {
                    alert("You are not logged in!");
                    return;
                }

                // defininf the body for posting to the backend with the necessary information
                this.pokeFavs = {
                    pokeName: name,
                    userId: localStorage.getItem("userId")
                }

                // updating the pokemon to the list of favourites
                let pokeFavsUser = localStorage.getItem('pokeFavsUser') ? JSON.parse(localStorage.getItem('pokeFavsUser')) : [];
                if (pokeFavsUser.includes(this.name)) {
                    // here goes the delete post to the backend ---
                    pokeFavsUser = pokeFavsUser.filter(item => item !== name);
                } else {
                    await this.$axios.post(`http://localhost:3001/addPokeFav`, this.pokeFavs);
                    pokeFavsUser.push(name);
                }
                localStorage.setItem('pokeFavsUser', JSON.stringify(pokeFavsUser));

                // updating the svg opacity real-time whenever it is clicked
                let newPokeFavsUser = localStorage.getItem('pokeFavsUser') ? JSON.parse(localStorage.getItem('pokeFavsUser')) : [];
                if (newPokeFavsUser.includes(this.name)) {
                    event.target.style.opacity = 1;
                } else {
                    event.target.style.opacity = 0.25;
                };
            }
        },
        computed: {
            isPokeFav() {
                // checks in the localstorage if the any of the pokemons is already a favourite and returns true or false
                const pokeFavsUser = localStorage.getItem("pokeFavsUser") ? JSON.parse(localStorage.getItem("pokeFavsUser")) : '';
                return pokeFavsUser.includes(this.name);
            },
        },
        mounted() {
            let allPokeCards = document.querySelectorAll('.pokeCard');
            for (let pokeCardAvailable of allPokeCards) {
                let type = pokeCardAvailable.lastChild.childNodes[2].innerText;
                if (typeColors[type]) {
                    pokeCardAvailable.firstChild.firstChild.style.backgroundColor = typeColors[type];
                } else {
                    pokeCardAvailable.firstChild.firstChild.style.backgroundColor = '#FFFFFF';
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
    .img-button-container {
        position: relative;
        z-index: 0;
        width: 250px;
    }
    .text {
        text-align: center;
    }
    .addPokemon {
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .pokeFav {
        opacity: 1 !important;
        filter: grayscale(0%) !important;
    }
    #img {
        background-color: #A8A77A;
        border-radius: 5px;
        display: block;
        width: 100%;
    }
    #pokePng {
        height: 15%;
        width: 15%;
        background-color: #ffffff00;
        opacity: 0.25;
        transition: transform 0.2s ease-in-out;
    }
    #pokePng:hover {
        transform: scale(1.1);
    }
    #pokePng:active {
        animation: shake 0.5s;
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
    @keyframes shake {
        0% { transform: translate(0, 0) rotate(0deg); }
        20% { transform: translate(-10px, 0) rotate(-20deg); }
        40% { transform: translate(10px, 0) rotate(20deg); }
        60% { transform: translate(-10px, 0) rotate(-10deg); }
        80% { transform: translate(10px, 0) rotate(10deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
    }
</style>
