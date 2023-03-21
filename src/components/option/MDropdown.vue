<template>
  <div class="table__dropdown">
    <div class="table__dropdown-item">Nhân bản</div>
    <div @click="deleteEmployeeID" id="option" class="table__dropdown-item">
      <span>Xóa</span>
    </div>
    <div class="table__dropdown-item">Ngừng sử dụng</div>
  </div>
</template>

<script>
export default {
  name: "MDropdown",
  props:["id"],
  methods: {
    /**
     * Xóa thông tin nhân viên theo id
     * Created By: TNDuong(9/1/2023)
     */
    deleteEmployeeID(id) {
      alert("1")
      this.employee = () => {
        fetch(`https://cukcuk.manhnv.net/api/v1/Employees/${id}`, {
          method: "DELETE",
        });
      };
    },
  },
  data() {
    return {
      employee: {},
      employeeID:1,
    };
  },
};
</script>

<style scoped>
@import url(dropdown.css);
</style>
