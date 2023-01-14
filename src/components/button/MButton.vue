<template>
    <div class="body__content-top-btn"><button id="button" title="Thêm mới nhân viên" class="btn"><span>{{ btnText }}</span></button></div>  
</template>

<script>
export default {
    name: "MButton",
    props:["btnText"]
}
</script>

<style scoped>
    @import url(button.css);
</style>