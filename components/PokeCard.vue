<template>
        <div class="pokeCard">
            <img id="img" :src=sprite />
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
        mounted() {
            let allPokeCards = document.querySelectorAll('.pokeCard');
            for (let pokeCardAvailable of allPokeCards) {
                switch (pokeCardAvailable.lastChild.childNodes[2].innerText) {
                    case 'grass':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#4DAD5B"
                        break;
                    case 'fire':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#EE8130"   
                        break;
                    case 'water':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#1B53BA"           
                        break;
                    case 'bug':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#A6B91A"           
                        break;
                    case 'poison':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#A33EA1"           
                        break;
                    case 'electric':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#F7D02C"           
                        break;
                    case 'ground':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#E2BF65"           
                        break;
                    case 'fairy':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#D685AD"           
                        break;
                    case 'fighting':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#C22E28"           
                        break;
                    case 'psychic':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#F95587"           
                        break;
                    case 'rock':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#B6A136"           
                        break;
                    case 'ghost':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#735797"           
                        break;
                    case 'ice':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#96D9D6"           
                        break;
                    case 'dragon':
                        pokeCardAvailable.firstChild.style.backgroundColor = "#6F35FC"           
                        break;
                    default:
                        pokeCardAvailable.firstChild.style.backgroundColor = "#A8A77A"   
                        break;
                }
            }
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
