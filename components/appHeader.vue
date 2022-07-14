<template>
    <header class="header">
        <h1 class="title">PokeApi</h1>
        <ul>
            <li>
                <nuxt-link to="/" > Home </nuxt-link>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  margin: 0;
  padding: 0;
  top: 0;
  width: 100%;
}
.title {
  color: #f2f2f2;
  float: left;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  margin-left: 15px;
  overflow: hidden;
}
.title:hover {
  background-color: #dc2f02;
}
ul {
  display: flex;
}
a {
  display: inline-block;
  background: #333;
  color: #fff;
  padding: 0.3rem 1rem;
  margin-right: 0.5rem;
}

</style>
