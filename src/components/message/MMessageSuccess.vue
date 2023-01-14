<template>
    <div class="overlay-message">
        <div class="msgbox">
        <div class="msg-content">
            <div class="messagebox-success-icon"></div>
            <div class="messagebox-content-describe">{{ message }}</div>
        </div>
        <div class="msg-footer">
            <button class="button" @click="closeMessage">Đóng</button>
        </div>
    </div>
    </div>
</template>

<script>
export default{
    name: "MMessageSuccess",
    props:["message"],
    methods:{
        closeMessage(){
            this.$emit('hideMessage', false)
        }
    }
}
</script>

<style>
@import url(message.css);
</style>