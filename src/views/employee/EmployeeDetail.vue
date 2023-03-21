<template>
  <div id="modal" class="modal">
    <div class="popup__staff">
      <div class="staff-question sprite-question"></div>
      <div
        @click="checkChangeAndHideDialog"
        class="sprite-smark staff-xmark"
      ></div>

      <div class="staff__info">
        <div class="staff__info-label">{{ titleForm }}</div>
        <div class="staff__info-object">
          <input type="checkbox" />
          <div class="staff__info-text">Là nhân viên</div>
        </div>
        <div class="staff__info-object">
          <input type="checkbox" />
          <div clatxtNamess="staff__info-text">Là nhà cung cấp</div>
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
              :class="{ errorBoder: errors.codeError }"
              @blur="validate"
            />
            <div class="errormsg">{{ errors.codeError }}</div>
          </div>
          <div class="staff-name">
            <div class="name-text">Tên</div>
            <input
              v-model="employee.FullName"
              type="text"
              class="name-input input-active"
              :class="{ errorBoder: errors.nameError }"
              @blur="validate"
            />
            <div style="right: 0" class="errormsg">{{ errors.nameError }}</div>
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
              <input
                v-model="employee.Gender"
                checked
                type="radio"
                name="gender"
                id="gender"
                value="0"
              /><span class="gender-text">Nam</span>
              <input
                v-model="employee.Gender"
                type="radio"
                name="gender"
                value="1"
                id="gender"
              /><span class="gender-text">Nữ</span>
              <input
                v-model="employee.Gender"
                type="radio"
                value="2"
                name="gender"
                id="gender"
              /><span class="gender-text">Khác</span>
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
            class="cbxDepartment"
            :class="{ errorBoder: errors.departmentError }"
            @blur="validate"
          ></MCombobox>
          <div class="errormsg">{{ errors.departmentError }}</div>
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
            <MInputDate
              type="date"
              v-model="employee.IdentityDate"
            ></MInputDate>
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
            v-model="employee.Address"
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
// import commonJS from "@/js/common";
// import MEnum from "../../js/enum.js";
import MResource from "@/js/resource";
import axios from "axios";
export default {
  name: "EmployeeDetail",
  props: ["employeeUpdate", "id", "acceptSave"],
  components: { MInput, MCombobox, MInputDate },
  created() {
    /**
     * Hiển thị thông tin nhân viên lên form chi tiết
     * Created By: TNDuong(2/1/2023)
     */
    var me = this;
    // console.log(me);
    this.employee = this.employeeUpdate;
    if (this.id) {
      fetch(`https://cukcuk.manhnv.net/api/v1/employees/${this.id}`)
        .then((res) => res.json)
        .then((emp) => {
          me.employee = emp.data;
          me.employee.DateOfBirth = me.formatDate(emp.data.DateOfBirth);
          me.employee.IdentityDate = me.formatDate(emp.data.IdentityDate);
        });
    } else {
      // this.getNewEmployeeCode();
      // this.employee.Gender = 0;
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
          date = date < 10 ? `0${date}` : date;
          month = month < 10 ? `0${month}` : month;
          return `${year}-${month}-${date}`;
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    },
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
     * dữ liệu thay đổi, xác nhận có muốn cất dữ liệu hay không
     * Created By: TNDuong(2/1/2023)
     */
    checkChangeAndHideDialog() {
      this.$emit("confirmClose");
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
        });
    },
    /**
     * Lưu data
     * Created By: TNDuong(2/1/2023)
     */
    async saveData() {
      var me = this;
      var newData = this.employee;
      // console.log("new data:", newData);
      var res;
      if (!this.employee.EmployeeId) {
        res = await axios.post(
          "https://cukcuk.manhnv.net/api/v1/Employees",
          newData
        );
        me.$emit("showToast", MResource.vi.add);
      } else {
        // eslint-disable-next-line
        res = await axios.put(
          `https://cukcuk.manhnv.net/api/v1/Employees/${this.employee.EmployeeId}`,
          newData
        );
        // console.log(res.data);
        me.$emit("showToast", MResource.vi.update);
      }
    },

    /**
     * Validate form
     * Created By: TNDuong(11/01/2023)
     */
    validate() {
      this.errors = {
        codeError: "",
        nameError: "",
        departmentError: "",
      };
      if (!this.employee.EmployeeCode) {
        this.errors.codeError = MResource.errors.codeError;
      } else return this.employee.EmployeeCode;
      if (!this.employee.FullName) {
        this.errors.nameError = MResource.errors.nameError;
      } else return this.employee.FullName;
      if (!this.employee.DepartmentId) {
        this.errors.departmentError = MResource.errors.departmentError;
      } else return this.employee.DepartmentId;
    },
    /**
     * Lưu và đóng form
     * Created By: TNDuong(2/1/2023)
     */
    async saveEmployee() {
      try {
        if (this.validate()) {
          $("#loading").show();
          await this.saveData();
          this.btnCloseOnClick();
          $("#loading").hide();
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Cất dữ lemployeeIdSelectediệu và thêm 1 form thêm chi tiết nhân viên mới
     * Created By: TNDuong(2/1/2023)
     */
    saveAndAdd() {
      if (this.validate()) {
        this.saveData();
        this.employee = {};
        this.getNewEmployeeCode();
        // window.location.reload();
      }
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
    /**
     * Đổi Tiêu đề form theo form mode
     * Author: TNDuong (7/1/2023)
     */
    titleForm() {
      return this.id === null
        ? "Thêm nhân viên"
        : "Thông tin nhân viên";
    },
  },
  watch: {
    acceptSave: function () {
      this.saveEmployee();
    },
  },
  data() {
    return {
      //Khởi tạo đối tượng employee
      employee: {
        FullName: "",
        EmployeeId: "",
        EmployeeCode: "",
        employeeDefault: null,
        DateOfBirth: null,
        confirmDelete: false,
        DepartmentId: "45ac3d26-18f2-18a9-3031-644313fbb055",
        IdentityDate: "07-07-2001",
        PositionName: "Nhân Viên",
      },
      // Khởi tạo các thông báo validate
      errors: {
        codeError: "",
        nameError: "",
        departmentError: "",
      },
    };
  },
};
</script>

<style scoped></style>
