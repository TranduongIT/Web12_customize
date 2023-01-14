<template>
  <!-- <MPopup v-if="showPopup" @onCloseDropdown="showPopup=false"></MPopup> -->
  <!-- <MLoading v-if="isLoadingDataForm"></MLoading> -->
  <div id="modal" class="modal">
    <div class="overlay"></div>
    <div class="popup__staff">
      <div class="staff-question sprite-question"></div>
      <div @click="btnCloseOnClick()" class="sprite-smark staff-xmark"></div>

      <div class="staff__info">
        <div class="staff__info-label">Thông tin nhân viên</div>
        <div class="staff__info-object">
          <input type="checkbox" />
          <div class="staff__info-text">Là nhân viên</div>
        </div>
        <div class="staff__info-object">
          <input type="checkbox" />
          <div class="staff__info-text">Là nhà cung cấp</div>
        </div>
      </div>
      <div class="wrap">
        <div class="staff-id-name">
          <div class="staff-id">
            <div class="id-text">Mã</div>
            <input
              v-model="employee.EmployeeCode"
              type="text"
              class="id-input input-active"
              ref="txtCode"
            />
          </div>
          <div class="staff-name">
            <div class="name-text">Tên</div>
            <input
              v-model="employee.FullName"
              ref="txtName"
              type="text"
              class="name-input input-active"
            />
            <span class="name-validate">Tên không được để trống.</span>
          </div>
        </div>
        <div class="staff-date-gender">
          <div class="staff-date">
            <div class="date-text">Ngày sinh</div>
            <MInputDate type="date" v-model="employee.DateOfBirth"></MInputDate>
          </div>
          <div class="staff-gender">
            <div class="date-text">Giới tính</div>
            <div class="gender-list">
              <input checked type="radio" name="gender" id="gender" /><span
                class="gender-text"
                >Nam</span
              >
              <input type="radio" name="gender" id="gender" /><span
                class="gender-text"
                >Nữ</span
              >
              <input type="radio" name="gender" id="gender" /><span
                class="gender-text"
                >Khác</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="staff-room">
          <div class="room-text input-text">Đơn vị</div>
          <!-- <input
            v-model="employee.DepartmentName"
            type="text"
            class="input-active default-input"
          /> -->
          <MCombobox
            id="cbxDepartment"
            api="https://cukcuk.manhnv.net/api/v1/departments"
            propName="DepartmentName"
            propValue="DepartmentId"
            v-model="employee.DepartmentId"
          ></MCombobox>
        </div>
        <div class="staff-idIdentify-date">
          <div class="staff-idIdentify">
            <div class="room-text input-text">Số CMND</div>
            <input
              v-model="employee.IdentityNumber"
              type="text"
              class="input-active default-input"
            />
          </div>
          <div class="staff-date">
            <div class="room-text input-text">Ngày cấp</div>
            <MInputDate type="date" v-model="employee.DateOfBirth"></MInputDate>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="staff-title">
          <div class="input-text">Chức danh</div>
          <input
            v-model="employee.PositionName"
            type="text"
            class="input-active default-input"
          />
        </div>
        <div class="staff-palace">
          <div class="input-text">Nơi cấp</div>
          <input
            v-model="employee.IdentityPlace"
            type="text"
            class="input-active default-input"
          />
        </div>
      </div>
      <div class="wrap">
        <div class="staff-address">
          <div class="input-text">Địa chỉ</div>
          <input
            v-model="employee.IdentityPlace"
            type="text"
            class="input-active default-input"
          />
        </div>
      </div>
      <div class="wrap">
        <MInput
          v-model:value="employee.PhoneNumber"
          label="ĐT di động"
        ></MInput>
        <MInput
          v-model:value="employee.PersonalTaxCode"
          label="ĐT Cố định"
        ></MInput>
        <MInput required v-model:value="employee.Email" label="Email"></MInput>
      </div>
      <div class="wrap wrap-end">
        <MInput
          v-model:value="employee.NationalityId"
          label="Tài khoản ngân hàng"
        ></MInput>
        <MInput
          v-model:value="employee.QualificationName"
          label="Tên ngân hàng"
        ></MInput>
        <MInput
          v-model:value="employee.NationalityName"
          label="Chi nhánh"
        ></MInput>
      </div>
      <div class="wrap wrap-btn">
        <button @click="btnCloseOnClick()" class="btn-default">
          <span>Hủy</span>
        </button>
        <div class="btn-wrap">
          <button @click="saveEmployee" class="btn-default">
            <span>Cất</span>
          </button>
          <button @click="saveAndAdd" class="btn-green">
            <span>Cất và thêm</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MInput from "../../components/input/MInput.vue";
import MCombobox from "@/components/combobox/MCombobox.vue";
import MInputDate from "@/components/input/MInputDate.vue";
import $ from "jquery";
// import MEnum from "../../js/enum.js";
import MResource from "@/js/resource";
// eslint-disable-next-line
import MLoading from "@/components/loading/MLoading.vue";
import axios from "axios";
// import MPopup from '@/components/popup/MPopup.vue';
export default {
  name: "EmployeeDetail",
  props: ["employeeUpdate", "id"],
  components: { MInput, MCombobox, MInputDate },
  created() {
    /**
     * Hiển thị thông tin nhân viên lên form chi tiết
     * Created By: TNDuong(2/1/2023)
     */
    var me = this;
    this.employee = this.employeeUpdate;
    me.employee.DateOfBirth = me.formatDate(me.employeeUpdate.DateOfBirth);
    console.log(me.employee.DateOfBirth);
    if (this.id) {
      fetch(`https://cukcuk.manhnv.net/api/v1/employees/${this.id}`)
        .then((res) => res.json)
        .then((emp) => {
          me.employee = emp;
          me.employee.DateOfBirth = me.formatDate(
            me.employeeUpdate.DateOfBirth
          );
          me.getNewEmployeeCode();
          // this.isLoadingDataForm = false;
        });
    }
  },
  methods: {
    /**
     * Hàm định dạng kiểu dữ liệu ngày tháng
     * Created By: TNDuong(29/12/2022)
     */
    formatDate(dateTime) {
      try {
        if (dateTime != null && dateTime != undefined) {
          // Chuyển thành dữ liệu ngày tháng
          dateTime = new Date(dateTime);
          let date = dateTime.getDate();
          let month = dateTime.getMonth() + 1;
          let year = dateTime.getFullYear();
          return `${year}-${month}-${date}`;
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    },
    /**
     * Validate form
     * Created By: TNDuong(11/01/2023)
     */
    // validate() {
    //   // Bỏ trống mã nhân viên
    //   if (!this.employee.EmployeeCode) {
    //     this.errors.code = "Mã nhân viên không được bỏ trống";
    //     this.$refs.txtCode.classList.add("error");
    //     this.$emit("sendMessage", this.errors.code);
    //     return false;
    //   } else {
    //     this.$refs.txtCode.classList.remove("error");
    //   }
    //   // Bỏ trống tên nhân viên
    //   if (!this.employee.FullName) {
    //     this.errors.name = "Tên nhân viên không được bỏ trống";
    //     this.$refs.txtName.classList.add("error");
    //     this.$emit("sendMessage", this.errors.name);
    //     return false;
    //   } // Độ dài tên quá 255 kí tự
    //   else if (this.employee.FullName.length > 255) {
    //     this.errors.name = "Tên nhân viên dưới 255 kí tự";
    //     this.$refs.txtName.classList.add("error");
    //     this.$emit("sendMessage", this.errors.name);
    //     return false;
    //   } else {
    //     this.$refs.txtName.classList.remove("error");
    //   }
    //   // Dưới 18 tuổi
    //   if (this.employee.DateOfBirth) {
    //     var year = new Date(this.employee.DateOfBirth);
    //     var dob = year.getFullYear();
    //     var current = new Date();
    //     if (current.getFullYear() - dob < 18) {
    //       this.errors.dob = "Tuổi nhân viên phải trên 18";
    //       this.$refs.dob.classList.add("error");
    //       this.$emit("sendMessage", this.errors.dob);
    //       return false;
    //     } else {
    //       this.$refs.dob.classList.remove("error");
    //     }
    //   }

    //   return true;
    // },
    /**
     * Đóng form thông tin nhân viên
     * Created By: TNDuong(2/1/2023)
     */
    btnCloseOnClick() {
      this.$emit("onClose");
    },
    // Click hủy exit để đóng form
    btnOnCancel() {
      try {
        this.$emit("onClose");
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy mã nhân viên mới
     * Created By: TNDuong(2/1/2023)
     */
    getNewEmployeeCode() {
      var me = this;
      axios
        .get("https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode")
        .then(function (res) {
          me.employee.EmployeeCode = res.data;
          // me.$refs.txtCode.focus();
        });
    },
    /**
     * Lưu data
     * Created By: TNDuong(2/1/2023)
     */
    async saveData() {
      try {
        var newData = this.employee;
        console.log("new data:", newData);
        // eslint-disable-next-line
        var res;
        if (!this.employee.EmployeeId) {
          res = await axios.post(
            "https://cukcuk.manhnv.net/api/v1/Employees",
            // {Gender: 0, DepartmentName: 'Phòng Công Nghệ Thông Tin', DepartmentId: '3f8e6896-4c7d-15f5-a018-75d8bd200d7c', EmployeeCode: 'NV-8217', FullName: newData.FullName}
            newData
          );
          console.log("res: ", res.data);
          //return res
        } else {
          // eslint-disable-next-line
          res = await axios.put(
            `https://cukcuk.manhnv.net/api/v1/Employees/${this.employee.EmployeeId}`,
            newData
          );
          console.log(res.data);
        }
      } catch (error) {
        console.log("error api: ", error);
      }
    },
    /**
     * Lưu và đóng form
     * Created By: TNDuong(2/1/2023)
     */
    async saveEmployee() {
      try {
        $("loading").show();
        await this.saveData();
        this.btnCloseOnClick();
        $("loading").hide();
        return;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Cất dữ liệu và thêm 1 form thêm chi tiết nhân viên mới
     */
    saveAndAdd() {
      $("loading").show();
      this.saveData();
      this.employee = {};
      this.getNewEmployeeCode();
      this.btnCloseOnClick();
      $("loading").hide();
    },
    /**
     * hiện thông báo xác nhận xóa
     * Created By: TNDuong(2/1/2023)
     */
    deleteEmployee() {
      this.message = MResource.vi.delete;
      this.confirmDelete = true;
    },
    /**
     * Đóng thông xác nhận xóa
     * Created By: TNDuong(2/1/2023)
     */
    cancelDelete(e) {
      this.confirmDelete = e;
    },
  },
  computed: {
    //Thêm id cho từng nhân viên
    isAdd() {
      if (this.id) {
        return false;
      } else {
        return true;
      }
    },
  },
  data() {
    return {
      employee: {
        FullName: "Trần Trí Tùng",
        // showPopup: false,
        EmployeeId: "",
        EmployeeCode: "",
        employeeDefault: null,
        DateOfBirth: null,
        confirmDelete: false,
        // isLoadingDataForm: false,
        DepartmentId: "45ac3d26-18f2-18a9-3031-644313fbb055",
        errors: {
          code: "",
          name: "",
          phone: "",
          dob: "",
        },
      },
    };
  },
};
</script>

<style scoped></style>
