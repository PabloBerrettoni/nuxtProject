<template>
    <div>
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
.nuxt-main-container {
    margin-top: 80px;
}
</style>