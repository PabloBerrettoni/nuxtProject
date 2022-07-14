<template>
    <div>
        <AppHeader :key="$route.fullPath"/>  
        <Nuxt class="container"/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.container {
    margin-top: 80px;
}
</style>