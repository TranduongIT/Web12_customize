<template>
    <div class="overlay-message">
        <div class="msgbox">
            <div class="messagebox-header">
                <div class="messagebox-header-title">Thông báo</div>
                <div class="messagebox-header-close"  @click="close"></div>
            </div>
            <div class="msg-content">
                <div class="messagebox-validate-icon"></div>
                <div class="messagebox-content-describe">{{ error }}</div>
            </div>
            <div class="msg-footer">
                <button class="button" @click="close">Đóng</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name: "MMessageError",
        data(){
            return{
            
            }
        },
        props: ['error'],
        methods:{
            /**
             * Đóng message
             * Created By: TNDuong(07/01/2023)
             */
            close(){
                this.$emit('close');
            }
        }
    }

</script>
<style>
@import url(message.css);
.messagebox-validate-icon {
	background: url('../../assets/img/Sprites.64af8f61.svg') no-repeat -32px -959px;
	width: 36px;
	height: 36px;
    margin-right: 8px;
}
</style>