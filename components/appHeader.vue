<template>
    <header class="header">
        <ul>
            <li class="title">
                <nuxt-link to="/" > PokeApi </nuxt-link>
            </li>
        </ul>
    </header>
</template>

<script>
    export default {
        name: "appHeader"
    }
</script>

<style scoped>

.header {
  position: fixed;
  background-color: #333;
  margin: 0;
  padding: 0;
  top: 0;
  width: 100%;
}
ul {
  display: flex;
  padding: 0;
}
a {
  display: inline-block;
  background: #333;
  color: #fff;
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
}

</style>
