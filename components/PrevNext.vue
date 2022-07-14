<template>
    <div class="container">
        <p v-show="offset.next > 9" v-on:click="prev()">previous</p>
        <p></p>
        <p v-on:click="next()">next</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offset: [{ "next": 0 }, 'previous']
        }
    },
    methods: {
        next() {
            this.offset[0].next =+ 10;
            this.$emit('clickNext', this.offset.next);
            this.offset.previous =+ 10;
            console.log(this.offset[0].next)
        },
        prev() {
            this.offset.previous =- 10;
            this.$emit('clickNext', this.offset.previous);
            this.offset.next =- 10;
        }
    },
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
}
p {
    margin: 5px;
}
</style>