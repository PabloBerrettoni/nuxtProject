<template>
    <div class="nuxtMainDiv">
        <AppHeader :key="$route.fullPath"/>  
        <Nuxt class="nuxt-main-container"/>
        <Footer/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
html, body {
    width: 100vw;
    height: 100vh;
    font-size: 1.2rem;
}
.nuxtMainDiv {
}
.nuxt-main-container {
    min-height: 80vh;
    margin-top: 10vh;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}
@media screen and (min-width: 720px) {
    .nuxt-main-container {
        min-height: 90vh;
        margin-top: 5vh;
    }
}
</style>