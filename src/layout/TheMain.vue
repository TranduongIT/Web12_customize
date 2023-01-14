<template>
  <MLoading v-if="isLoading"></MLoading>
  <!-- <MPopup></MPopup> -->
  <div id="body">
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
              v-model="textSearch"
              placeholder="Tìm kiếm theo nhân viên"
            />
            <div class="icon-search sprite-search" @click="btnSearch"></div>
          </div>
          <button
            @click="onClickLoading()"
            class="body__search-refresh spite-refresh"
          ></button>
        </div>
      </div>
      <div class="body__content-table">
        <!-- <div class="body__content-footer">
          <div class="footer-left">Tổng sô: 1000 bản ghi</div>
          <div class="footer-right">
            <div class="footer__paginate">
              <span class="option-paginate">20 bản ghi trên 1 trang</span>
            </div>
            <span class="footer-text">trước</span>
            <div class="footer__list-paginate">
              <div class="footer__list-paginate-item">1</div>
              <div class="footer__list-paginate-item">2</div>
              <div class="footer__list-paginate-item">3</div>
              <div class="footer__list-paginate-item-expend">...</div>
              <div class="footer__list-paginate-item">57</div>
            </div>
            <span class="footer-text">sau</span>
          </div>
          <div class="footer-dropdown">
            <div class="footer-dropdown-list">
              <div class="footer-dropdown-list-item">
                <span class="foter-dropdown-text">10 bản ghi trên 1 trang</span>
              </div>
              <div class="footer-dropdown-list-item">
                <span class="foter-dropdown-text">20 bản ghi trên 1 trang</span>
              </div>
              <div class="footer-dropdown-list-item">
                <span class="foter-dropdown-text">30 bản ghi trên 1 trang</span>
              </div>
              <div class="footer-dropdown-list-item">
                <span class="foter-dropdown-text">50 bản ghi trên 1 trang</span>
              </div>
              <div class="footer-dropdown-list-item">
                <span class="foter-dropdown-text"
                  >100 bản ghi trên 1 trang</span
                >
              </div>
            </div>
          </div>
        </div> -->
        <table class="table-list" id="tbEmployeelist">
          <thead>
            <tr class="table-list-th">
              <th><input id="checkboxclick" type="checkbox" /></th>
              <th>MÃ NHÂN VIÊN</th>
              <th>TÊN NHÂN VIÊN</th>
              <th>GIỚI TÍNH</th>
              <th>NGÀY SINH</th>
              <th>SỐ CMND</th>
              <th>CHỨC DANH</th>
              <th>TÊN ĐƠN VỊ</th>
              <th>SỐ TÀI KHOẢN</th>
              <th>TÊN NGÂN HÀNG</th>
              <th>CHI NHANH NGÂN HÀNG</th>
              <th>CHỨC NĂNG</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in employees"
              :key="index"
              @dblclick="rowOnDblClick(item)"
            >
              <td><input type="checkbox" /></td>
              <td class="text-left">{{ item.EmployeeCode }}</td>
              <td class="text-left">{{ item.FullName }}</td>
              <td class="text-left">{{ item.GenderName }}</td>
              <td class="text-center">{{ formatDate(item.DateOfBirth) }}</td>
              <td class="text-left">{{ item.IdentityNumber }}</td>
              <td class="text-left">{{ item.PositionName }}</td>
              <td class="text-left">{{ item.DepartmentName }}</td>
              <td class="text-left">{{ item.PersonalTaxCode }}</td>
              <td class="text-left">{{ item.IdentityPlace }}</td>
              <td class="text-left">{{ item.IdentityPlace }}</td>
              <td class="text-center txtDetail">
                Sửa
                <div
                  @click="btnShowOptionOnClick()"
                  class="sprite-icon-down"
                ></div>
              </td>
            </tr>
            <MDropdown v-if="showoption"></MDropdown>
          </tbody>
        </table>
        <div id="loading"></div>
      </div>
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
        <!-- <Paginate
          v-model="page"
          :page-count="totalPage"
          :page-range="2"
          :margin-pages="1"
          :click-handler="clickCallback"
          :prev-text="page == 1 ? '' : 'Trước'"
          :next-text="page == totalPage ? '' : 'Sau'"
          :container-class="'pagination'"
          :page-class="'page-item'"
        /> -->
      </div>
    </footer>
  </div>
  <EmployeeDetail
    :id="employeeIDSelected"
    :employeeUpdate="employeeSelected"
    v-if="showDiaLog"
    @onClose="showDiaLog = !showDiaLog"
  >
  </EmployeeDetail>
</template>

<script>
// Import các vue dùng chung từ bên ngoài vào
import EmployeeDetail from "../views/employee/EmployeeDetail.vue";
import MButton from "../components/button/MButton.vue";
import MLoading from "../components/loading/MLoading.vue";
import MDropdown from "../components/option/MDropdown.vue";
// import MMessageChange from "@/components/message/MMessageChange.vue";
// import MMessageDelete from "@/components/message/MMessageDelete.vue";
// import MMessageError from "@/components/message/MMessageError.vue";
// import MMessageSuccess from "@/components/message/MMessageSuccess.vue";
import $ from "jquery";
import Paginate from "vuejs-paginate";
// eslint-disable-next-line
import MPageCombobox from "@/components/pageCombobox/MPageCombobox.vue";
// import axios from "axios";
// import MPopup from '@/components/popup/MPopup.vue'
// import { commonJS } from "@/js/common";
// import EmployeeList from '../views/employee/EmployeeList.vue';
export default {
  name: "TheMain",
  // eslint-disable-next-line
  components: {
    EmployeeDetail,
    MButton,
    MLoading,
    MDropdown,
    MPageCombobox,
    // eslint-disable-next-line
    Paginate,
  },
  methods: {
    /**
     * Hàm Tìm kiếm nhân viên
     * Created By: TNDuong(11/1/2023)
     */
    btnSearch() {
      (this.employees = null), $("#loading").show();
      fetch(
        `https://cukcuk.manhnv.net/api/v1/Employees/filter?employeeFilter=${this.textSearch}`
      )
        .then((res) => res.json())
        .then((Data) => {
          this.employees = Data.Data;
        });
      $("#loading").hide();
    },
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
          return `${date}/${month}/${year}`;
        } else {
          return "";
        }
      } catch (error) {
        return "";
      }
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
      this.pageSize = e;
      this.showPageOption();
      this.filterEmployee();
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
     * Hiển thị dialog danh sách nhân viên
     * Created By: TNDuong(2/1/2023)
     */
    btnAddOnClick() {
      this.showDiaLog = true;
      this.employeeIDSelected = null;
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
     * Hiển thị drop downlist option
     * Created By: TNDuong(7/1/2023)
     */
    btnShowOptionOnClick() {
      this.showoption = !this.showoption;
    },
    /**
     * Loading lại trang web
     * Created By: TNDuong(7/1/2023)
     */
    onClickLoading() {
      $("#loading").show();
    },
  },
  watch: {},
  created() {
    /**
     * Lấy dữ liệu từ API
     * Created By: TNDuong(2/1/2023)
     */
    $("#loading").show();
    fetch("https://cukcuk.manhnv.net/api/v1/employees")
      .then((res) => res.json())
      .then((Data) => {
        this.employees = Data;
      });
    $("#loading").hide();
  },
  data() {
    return {
      showDiaLog: false,
      employees: {},
      employeeSelected: {},
      employeeIDSelected: {},
      isLoading: false,
      isShowMessageError: false,
      showoption: false,
      textSearch: null,
      showloading: false,
      totalRecord: 0,
      pageSize: 10,
      isShowFooterCbb: false,
      totalPage: 0,
      page: 1,
    };
  },
};
</script>

<style scoped>
.pagination {
  margin-left: 20px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-item {
  margin: 0 10px;
  cursor: pointer;
  /* width: 24px; */
  height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
}
.page-item.disabled {
  /* width: 48px; */
  width: 24px;
}
.page-item.active {
  border: 1px solid #dfdfdf;
  font-weight: 700;
  text-align: center;
}
.page-item.active a {
  width: 24px;
  text-align: center;
}
</style>
