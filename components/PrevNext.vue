<template>
    <div class="container-pagination">
        <button :disabled="offset < 9" v-on:click="prevNext('prev')" class="prevNext">previous</button>
        <button v-show="offset > 9" @click="prevNext('last')">{{ (offset - 10) / 10 + 1 }}</button>
        <button class="actual">{{ offset / 10 + 1 }}</button>
        <button @click="prevNext('coming')">{{ (offset + 10) / 10 + 1 }}</button>
        <button v-on:click="prevNext('next')" class="prevNext">next</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            offset: 0,
        }
    },
    methods: {
        prevNext(operation) {
            if (operation == 'prev') {
                this.offset = this.offset - 10;
            } else if (operation == 'next'){
                this.offset = this.offset + 10;
            } else if (operation == 'last') {
                this.offset = this.offset - 10;
            } else if (operation == 'coming') {
                this.offset = this.offset + 10;
            }
            this.$emit('prevNext', this.offset);
        }
    },
}
</script>

<style scoped>
.container-pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    gap: 10px;
}
button {
    width: 40px;
    margin-bottom: 10px;
}
.prevNext {
    width: 75px;
}
.actual {
    border-color: #dda15e;
    border-radius: 5px;
}
</style>