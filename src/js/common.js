/**
* Hàm định dạng kiểu dữ liệu ngày tháng
* Created By: TNDuong(2/1/2022)
*/
const commonJS = {
    formatDate(dateTime){
        try {
            if(dateTime != null && dateTime != undefined){
            // Chuyển thành dữ liệu ngày tháng
            dateTime = new Date(dateTime);
            let date = dateTime.getDate();
            let month = dateTime.getMonth() + 1;
            let year = dateTime.getFullYear();
            return `${date}/${month}/${year}`;
            }
            else{
                return "";
            }
        } catch (error) {
            return "";
        }
    }
}

export default commonJS;