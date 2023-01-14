<template>
    <div id="body">
            <div class="body__header">
                <div class="body__header-left">
                    <div class="body__header-left-icon"><i class="fa-solid fa-bars"></i></div>
                    <div class="body__header-left-texr">CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ PHÚC LỢI</div>
                    <div class="body__header-left-chevron"><i class="fa-solid fa-chevron-down"></i></div>
                </div>
                <div class="body__header-right">
                    <div class="body__header-right-bell"><i class="right-bel fa-regular fa-bell"></i></div>
                    <div class="body__header-right-avt"><div class="menu-item-icon spriteavatar"></div></div>
                    <div class="body__header-right-user">Nguyễn Văn Mạnh</div>
                </div>
            </div>
            <div class="body__content">
                <div class="body__content-top">
                    <div class="body__content-top-label">Nhân viên</div>
                    <div class="body__content-top-btn"><button @click="btnAddOnClick()" id="button" title="Thêm mới nhân viên" class="btn"><span>Thêm mới nhân viên</span></button></div>
                </div>
                <div class="body__content-header">
                    <div class="body__search">
                        <div class="body__search-input">
                            <input class="search-input" type="text" placeholder="Tìm kiếm theo nhân viên">
                            <i class="icon-search fa-sharp fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div class="body__search-refresh"><i class="fa-solid fa-rotate-right"></i></div>
                    </div>
                </div>
                <div class="body__content-table">
                    <div class="body__content-footer">
                            <div class="footer-left">
                                Tổng sô: 1000 bản ghi
                            </div>
                            <div class="footer-right">
                                <div class="footer__paginate"><span class="option-paginate">20 bản ghi trên 1 trang</span></div>
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
                                    <div class="footer-dropdown-list-item"><span class="foter-dropdown-text">10 bản ghi trên 1 trang</span></div>
                                    <div class="footer-dropdown-list-item"><span class="foter-dropdown-text">20 bản ghi trên 1 trang</span></div>
                                    <div class="footer-dropdown-list-item"><span class="foter-dropdown-text">30 bản ghi trên 1 trang</span></div>
                                    <div class="footer-dropdown-list-item"><span class="foter-dropdown-text">50 bản ghi trên 1 trang</span></div>
                                    <div class="footer-dropdown-list-item"><span class="foter-dropdown-text">100 bản ghi trên 1 trang</span></div>
                                </div>
                            </div>
                        </div><table class="table-list" id="tbEmployeelist">
                        <thead>
                            <tr class="table-list-th">
                                <th><input id="checkboxclick" type="checkbox"></th>
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
                                <!-- <tr v-for="(item, index) in employees" :key="index">
                                    <td><input type="checkbox"></td>
                                    <td>{{item.EmployeeCode}}</td>
                                    <td>{{item.FullName}}</td>
                                    <td>{{item.GenderName}}</td>
                                    <td>{{item.DateOfBirth}}</td>
                                    <td>{{item.IdentityNumber}}</td>
                                    <td>{{item.PositionName}}</td>
                                    <td>{{item.DepartmentName}}</td>
                                    <td>{{item.PersonalTaxCode}}</td>
                                    <td>{{item.IdentityPlace}}</td>
                                    <td>{{item.IdentityPlace}}</td>
                                    <td class="text-center">Sửa <i class="show__list-item fa-solid fa-caret-down table__caret-down"></i></td>
                                </tr> -->

                                </tbody>
                        
                    </table>
                    <div class="table__dropdown">
                        <div class="table__dropdown-item">Nhân bản</div>
                        <div class="table__dropdown-item"><span class="color-text-green">Xóa</span></div>
                        <div class="table__dropdown-item">Ngừng sử dụng</div>
                    </div>
                </div>
            </div>
    </div>
    <EmployeeDetail v-if="showDiaLog" @onClose="showDiaLog=false"></EmployeeDetail>
</template>

<script>
import EmployeeDetail from './EmployeeDetail.vue'
export default {
    name:"EmployeeList",
    components:{EmployeeDetail},
    methods:{
        //Hiển thị dialog danh sách nhân viên
        btnAddOnClick(){
            this.showDiaLog = true;
        },
    },
    created(){
    // lấy dữ liệu
    fetch("https://cukcuk.manhnv.net/api/v1/employees")
            .then(res => res.json())
            .then(Data=>{
                this.employees = Data;
            })
    },
    data() {
        return {
            showDiaLog: false
        }
    },
};
</script>

<style scoped>

</style>