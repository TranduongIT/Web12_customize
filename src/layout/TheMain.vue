<template>
  <MLoading v-if="isLoading"></MLoading>
  <div id="body" class="content">
    <div class="body__header">
      <div class="body__header-left">
        <div class="body__header-left-icon">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div class="body__header-left-texr">
          CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ PHÚC LỢI
        </div>
        <div class="body__header-left-chevron">
          <i class="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      <div class="body__header-right">
        <div class="body__header-right-bell"></div>
        <div class="body__header-right-avt">
          <div class="menu-item-icon spriteavatar"></div>
        </div>
        <div class="body__header-right-user">Trần Ngọc Dương</div>
      </div>
    </div>
    <div class="body__content">
      <div class="body__content-top">
        <div class="body__content-top-label">Nhân viên</div>
        <MButton
          @click="btnAddOnClick()"
          btnText="Thêm mới nhân viên"
        ></MButton>
      </div>
      <div class="body__content-header">
        <div class="body__search">
          <div class="body__search-input">
            <input
              class="search-input"
              type="text"
              v-model="btnSearch"
              placeholder="Tìm kiếm theo nhân viên"
            />
            <div class="icon-search sprite-search"></div>
          </div>
          <button
            @click="filterEmployee"
            class="body__search-refresh spite-refresh"
          ></button>
        </div>
      </div>
      <div class="body__content-table">
        <table class="table-list" id="tbEmployeelist">
          <thead>
            <tr class="table-list-th">
              <th>
                <MCheckbox ref="checkAll" @click="checkAll" id="checkall" />
              </th>
              <th>MÃ NHÂN VIÊN</th>
              <th>TÊN NHÂN VIÊN</th>
              <th>GIỚI TÍNH</th>
              <th>NGÀY SINH</th>
              <th>SỐ CMND</th>
              <th>CHỨC DANH</th>
              <th>TÊN ĐƠN VỊ</th>
              <th>SỐ TÀI KHOẢN</th>
              <th>TÊN NGÂN HÀNG</th>
              <th>CHI NHÁNH NGÂN HÀNG</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in employees"
              :key="index"
              @dblclick="rowOnDblClick(item)"
            >
              <td>
                <MCheckbox :isCheckAll="isCheckAll" :id="item.index" />
              </td>
              <td class="text-left">{{ item.EmployeeCode }}</td>
              <td class="text-left">{{ item.FullName }}</td>
              <td class="text-left">{{ item.GenderName }}</td>
              <td class="text-center">{{ formatDate(item.DateOfBirth) }}</td>
              <td class="text-left">{{ item.IdentityNumber }}</td>
              <td class="text-left">{{ item.PositionName }}</td>
              <td class="text-left">{{ item.DepartmentName }}</td>
              <td class="text-left">{{ item.PersonalTaxCode }}</td>
              <td class="text-left">{{ item.QualificationName }}</td>
              <td class="text-left">{{ item.NationalityName }}</td>
              <td class="text-center txtDetail">
                <span style="cursor: pointer" @click="rowOnDblClick(item)">Sửa</span>
                <div
                  @click="btnShowOptionOnClick"
                  class="sprite-icon-down"
                ></div>
                <!-- <div class="context-menu-item" @click="deleteEmployee(item)">
                  Xóa {{ item.EmployeeCode }}
                </div>
                <div class="context-menu-item">Ngừng sử dụng</div> -->

                <div class="context-menu">
                  <div class="context-menu-item" @click="btnAddOnClick">
                    Nhân bản
                  </div>
                  <div class="context-menu-item" @click="deleteEmployee(item)">
                    Xóa
                  </div>
                  <div class="context-menu-item">Ngừng sử dụng</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div id="loading"></div>
      </div>

      <footer>
        <div class="total-record">
          Tổng số:
          <span style="font-family: Notosans-SemiBold">{{ totalRecord }}</span>
          bản ghi
        </div>
        <div class="pagination">
          <div class="pages-option">
            {{ pageSize }} bản ghi trên 1 trang
            <div class="box-icon" @click="showPageOption">
              <button id="cbx-icon" class="cbx-icon"></button>
            </div>
            <MPageCombobox
              :isShowCbb="isShowFooterCbb"
              @sizeRecord="sizeRecord"
            />
          </div>
          <Paginate
            v-model="page"
            :page-count="totalPage"
            :page-range="2"
            :margin-pages="1"
            :click-handler="clickCallback"
            :prev-text="page == 1 ? '' : 'Trước'"
            :next-text="page == totalPage ? '' : 'Sau'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          />
        </div>
      </footer>
    </div>
  </div>
  <EmployeeDetail
    :id="employeeIDSelected"
    :employeeUpdate="employeeSelected"
    v-if="showDiaLog"
    @onClose="showDiaLog = !showDiaLog"
    @confirmClose="confirmClose"
    :acceptSave="isAcceptSave"
    @showToast="showToast"
    @sendMessage="sendMessage"
  >
  </EmployeeDetail>
  <MMessageChange
    style="z-index: 100"
    v-if="isShowChangeMessage"
    @closeMessageChange="isShowChangeMessage = !isShowChangeMessage"
    @hideDialogAndMessage="hideDialogAndMessage"
  ></MMessageChange>
  <MMessageDelete
    v-if="confirmDelete"
    :employeeSelected="employeeSelected"
    @cancelDelete="cancelDelete"
    @deleteSuccess="deleteSuccess"
  />
  <MToast
    v-if="isShowToast"
    @hideToast="isShowToast = false"
    :message="message"
  />
  <MMessageError
    :error="errForm"
    v-if="isShowMessageError"
    @close="isShowMessageError = false"
  />
</template>

<script>
// Import các vue dùng chung từ bên ngoài vào
import MResource from "../js/resource";
import EmployeeDetail from "../views/employee/EmployeeDetail.vue";
import MButton from "../components/button/MButton.vue";
import MLoading from "../components/loading/MLoading.vue";
import MMessageChange from "@/components/message/MMessageChange.vue";
import MMessageDelete from "@/components/message/MMessageDelete.vue";
import MToast from "../components/toast/MToast.vue";
import MMessageError from "@/components/message/MMessageError.vue";
import $ from "jquery";
import Paginate from "vuejs-paginate-next";
import MPageCombobox from "@/components/pageCombobox/MPageCombobox.vue";
import axios from "axios";
import MCheckbox from "@/components/checkbox/MCheckbox.vue";
export default {
  name: "TheMain",
  // eslint-disable-next-line
  components: {
    EmployeeDetail,
    MButton,
    MLoading,
    MPageCombobox,
    MMessageChange,
    MMessageDelete,
    MToast,
    MMessageError,
    Paginate,
    MCheckbox,
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
          return `${date}/${month}/${year}`;
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
    },
    /**
     * Tìm kiếm, phân trang
     * Author: TNDuong (1/1/2023)
     */
    filterEmployee() {
      $(".modal").show();
      $("#loading").show();
      var me = this;
      var url = `https://cukcuk.manhnv.net/api/v1/Employees/filter?pageSize=${this.pageSize}&pageNumber=${this.pageNumber}&employeeFilter=${this.btnSearch}`;
      axios.get(url).then(function (res) {
        me.totalPage = res.data.TotalPage;
        me.totalRecord = res.data.TotalRecord;
        me.isSuccess = true;
        me.employees = res.data.Data;
        $("#loading").hide();
      });
    },

    /**
     * Chuyển trang
     * Author: TNDuong (1/1/2023)
     */
    clickCallback(pageNum) {
      this.pageNumber = pageNum;
      this.filterEmployee();
    },
    /**
     * Đổi size page
     * Author: TNDuong (1/1/2023)
     */
    sizeRecord(e) {
      localStorage.setItem("pageSize", e);
      this.pageSize = e;
      this.showPageOption();
      this.filterEmployee();
    },

    /**
     * Lấy thông báo validate
     * Author: TNDuong (7/1/2023)
     */
    sendMessage(e) {
      this.errForm = e;
      this.isShowMessageError = true;
    },

    /**
     * Hiện , ẩn chọn số bản ghi trên 1 trang
     * Author: TNDuong(1/1/2023)
     * isShowCbb = true: hiển thị
     * isShowCbb = false: ẩn
     */
    showPageOption() {
      // eslint-disable-next-line
      $("#cbx-icon").toggleClass("toogle-rotate");
      if (!this.isShowFooterCbb) {
        this.showPageFooterOption(true);
      } else {
        this.isShowFooterCbb = false;
      }
    },
    /**
     * Hiện , ẩn chọn số bản ghi trên 1 trang
     * Author: TNDuong(1/1/2023)
     * isShowFooterCbb = true: hiển thị
     * isShowFooterCbb = false: ẩn
     */
    showPageFooterOption(isShowCbb) {
      if (isShowCbb) {
        this.isShowFooterCbb = isShowCbb;
      }
    },
    /**
     * Xác nhận đóng hoặc cất dữ liệu
     * Author: TNDuong (10/1/2023)
     */
    confirmClose() {
      this.isShowChangeMessage = true;
    },
    /**
     * Ẩn dialog thông báo cất
     * Created By: TNDuong(2/1/2023)
     */
    hideDialogAndMessage() {
      this.isShowChangeMessage = false;
      this.showDiaLog = false;
      this.isAcceptSave = false;
    },
    /**
     * Đồng ý lưu
     * Author: TNDuong (10/1/2023)
     */
    acceptSave() {
      this.isAcceptSave = true;
    },
    /**
     * Hiển thị dialog danh sách nhân viên
     * Created By: TNDuong(2/1/2023)
     */
    btnAddOnClick() {
      this.showDiaLog = true;
      this.employeeIDSelected = null;
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
          me.employees.EmployeeCode = res.data;
        });
    },
    /**
     * Nháy đúp chuột để show form thông tin nhân viên
     * Created By: TNDuong(2/1/2023)
     */
    rowOnDblClick(item) {
      this.employeeSelected = item;
      this.employeeIDSelected = item.employeeId;
      this.showDiaLog = true;
    },
    /**
     * Nháy nút nhân bản để show form thông tin nhân viên
     * Created By: TNDuong(2/1/2023)
     */
    clReplication() {
      this.getNewEmployeeCode();
      this.showDiaLog = true;
      this.employeeIDSelected = null;
    },
    /**
     * Hiển thị drop downlist option
     * Created By: TNDuong(7/1/2023)
     */
    btnShowOptionOnClick(e) {
      this.btnMenuContext = e.target;
      var x = e.clientX;
      var y = e.clientY;
      let clientHeight =
        document.getElementsByClassName(".content").clientHeight;
      if (clientHeight - y < 80) {
        y = y - 110;
      }
      $(".context-menu").css("top", y + 10 + "px");
      $(".context-menu").css("left", x - 110 + "px");
      $(".context-menu").show(10);
    },
    /**
     * Loading lại trang web
     * Created By: TNDuong(7/1/2023)
     */
    onClickLoading() {
      $("#loading").show();
      window.location.reload();
      $("#loading").hide();
    },
    /**
     * Hiển thị toast message theo mode thêm hoặc sửa
     * Author: TNDuong (9/1/2023)
     */
    async showToast(e) {
      this.message = e;
      // console.log(this.message);
      this.isShowToast = true;
      await this.filterEmployee();
      var me = this;
      setTimeout(function () {
        me.isShowToast = false;
      }, 3000);
    },
    /**
     * hiện thông báo xác nhận xóa
     * Created By: TNDuong(7/1/2023)
     */
    deleteEmployee(item) {
      this.employeeSelected = item;
      this.employeeIDSelected = item.EmployeeId;
      this.message = MResource.vi.delete;
      this.confirmDelete = true;
      $(".context-menu").hide();
    },
    /**
     * Đóng thông xác nhận xóa
     * Created By: TNDuong(7/1/2023)
     */
    cancelDelete(e) {
      this.confirmDelete = e;
    },
    /**
     * Xóa thành công hiện toast message
     * Created By: TNDuong(7/1/2023)
     */
    async deleteSuccess() {
      this.isShowToast = true;
      await this.filterEmployee();
      var me = this;
      setTimeout(function () {
        me.isShowToast = false;
      }, 3000);
    },
    /**
     * Check All
     * Author: TNDuong (4/1/2023)
     */
    checkAll() {
      if (this.isCheckAll) {
        this.isCheckAll = false;
        return;
      }
      this.isCheckAll = true;
    },
  },
  watch: {
    /**
     * theo dõi ô search để tìm kiếm
     * Created By: TNDuong(2/1/2023)
     */
    btnSearch: function () {
      setTimeout(() => {
        this.filterEmployee();
      }, 300);
    },
  },
  created() {
    /**
     * Lấy dữ liệu từ API và sắp xếp theo trang
     * Created By: TNDuong(2/1/2023)
     */
    this.filterEmployee();
  },
  data() {
    return {
      //show or hide dialog
      showDiaLog: false,
      //Khởi tạo đối tượng employee bằng mảng rỗng
      employees: {},
      //Tạo biến employeeSelected
      employeeSelected: {},
      //Tạo biến employeeSelected để hứng props
      employeeIDSelected: {},
      // Show hide loading
      isLoading: false,
      // Show hide error message
      isShowMessageError: false,
      // Show hide option
      showoption: false,
      //Khai báo text search bằng null
      textSearch: null,
      // Show hide loading
      showloading: false,
      // Tống số bản ghi của trang
      totalRecord: 0,
      //Lưu trữ số bản ghi trên trang của trang web
      pageSize: localStorage.getItem("pageSize") ?? 10,
      //Show hide btn cbx footer
      isShowFooterCbb: false,
      //Khai báo số tổng trang hiện tại
      totalPage: 0,
      //Khai báo bản ghi bắt đầu
      page: 1,
      // Show hide change message
      isShowChangeMessage: false,
      // Kiểm trả lưu dữ liệu
      isAcceptSave: false,
      // Show Thông báo thành công khi thêm mới
      ShowSuccess: false,
      //Số trang hiện tại
      pageNumber: 1,
      //Khai báo biến btnSearch
      btnSearch: "",
      //Xác nhận xóa bản ghi
      confirmDelete: false,
      //Hiển thị dropdown list
      btnMenuContext: null,
      //Show toast thêm mới thành công
      isShowToast: false,
      // Gắn message bằng rỗng
      message: "",
      // Gắn errForm bằng rỗng
      errForm: "",
      //Tìm kiếm thành công
      isSuccess: true,
      //Gắn check all bằng False
      isCheckAll: false,
    };
  },
};
</script>

<style scoped></style>
