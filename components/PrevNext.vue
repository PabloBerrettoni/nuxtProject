<template>
    <div class="container">
        <p v-show="offset > 0" v-on:click="prevNext()">previous</p>
        <p></p>
        <p v-on:click="prevNext(1)">next</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offset: 0
        }
    },
    methods: {
        prevNext(operation) {
            if (operation) {
                this.offset = this.offset + 10;
            } else {
                this.offset = this.offset - 10;
            }
            this.$emit('clickNext', this.offset);
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