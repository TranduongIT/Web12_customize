class employee extends MService {
    // Lấy ra 1 nhân viên
  getEmployee() {
    let url = "https://cukcuk.manhnv.net/api/v1/Employees";
    return fetch(url);
  }
  // Thêm mới 1 nhân viên
  getNewEmployee() {
    return `${url}/${this.getEmployee}/`;
  }
  // Lấy mã nhân viên mới
  getNewEmployeeCode() {
    return `${url}/${this.getEmployee}/NewEmployeeCode`;
  }
  // Tìm kiếm phân trang
  filterEmployee() {
    return `${url}/filter`;
  }
}

const service = new employee();
export default service