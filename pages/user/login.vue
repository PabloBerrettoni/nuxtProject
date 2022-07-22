<template>
    <div class="container">
        <div class="formBox">
            <div>
                <h3>Login</h3>
                <form action="" method="post" class="textForm">
                    <label for="email">Login: </label>
                    <input type="email" name="email" id="email">
                    <label for="password">Password: </label>
                    <input type="password" name="password" id="password">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.formBox {
    display: flex;
    background-color: #333;
    flex-direction: column;
    width: 55%;
    border-radius: 15px;
    color: white;
}
.textForm {
    margin: 5px;
    text-align: center;
    display: flex;
    flex-direction: column;;
}
</style>