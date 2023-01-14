<template>
    <div class="modal__warning">
        <div class="overlay__warning popup-msg">
            <div class="popup__warning">
                 <div class="popup__warning-top">
                    <div class="top-icon-warning sprite__warning"></div>
                    <div class="top-icon-label">Mã nhân viên NV-001 đã tồn tại</div>
                 </div>
                 <div class="sprite-close"></div>
                 <div class="separate"></div>
                <div class="popup__warning-bottom">
                    <button class="popup__warning-bottom-btn"><span class="popup__warning-bottom-text">Đồng ý</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MPopup",
}
</script>

<style scoped>
    @import url(popup.css);
</style>