<template>
    <div class="staff-telphone">
        <div class="input-text">{{label}}</div>
        <input type="text" class="input-active default-input">
    </div>
</template>

<script>
export default {
    props: ["label"],
}
</script>

<style scoped>
    @import url(input.css);
</style>