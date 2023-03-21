<template>
  <div class="overlay-message">
    <div class="msgbox">
      <div class="messagebox-header">
        <div class="messagebox-header-title">Dữ liệu thay đổi</div>
        <div class="messagebox-header-close" @click="closeMessageChange"></div>
      </div>
      <div class="msg-content">
        <div class="messagebox-change-icon"></div>
        <div class="messagebox-content-describe">
          Dữ liệu đã thay đổi, bạn có muốn cất không?
        </div>
      </div>
      <div class="msg-change-footer">
        <div class="msg-footer-left">
          <button class="btn-white" @click="closeMessageChange">Hủy</button>
        </div>
        <div class="msg-footer-right">
          <button class="btn-white" @click="hideDialogAndMessage">Không</button>
          <button class="btn btn-default" @click="acceptSave">Cất</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  name: "MMessageChange",
  data() {
    return {};
  },
  props: [""],
  methods: {
    /**
     * Đóng message thay đổi dữ liệu
     */
    closeMessageChange() {
      this.$emit("closeMessageChange");
    },
    /**
     * Đóng cả dialog và message thay đổi dữ liệu
     */
    hideDialogAndMessage() {
      this.$emit("hideDialogAndMessage");
    },
    /**
     * Dữ liệu thay đổi đồng ý lưu dữ liệu
     * Author: TNDuong (10/1/2023)
     */
    acceptSave() {
      this.$emit("acceptSave");
    },
  },
};
</script>
<style>
@import url(message.css);
</style>
