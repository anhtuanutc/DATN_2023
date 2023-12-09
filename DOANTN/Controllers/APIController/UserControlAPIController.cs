using BTL_TTCMWeb.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web.Http;
using static BTL_TTCMWeb.Models.user.Controller_user.Controller_user;


namespace BTL_TTCMWeb.Controllers.APIController
{
    public class UserControlAPIController : ApiController
    {
        HAWContextEntities db = new HAWContextEntities();

        #region API lấy thông tin
        //Lấy ra danh sách đơn hàng cho chức năng theo dõi đơn hàng
        [HttpGet]
        [Route("GetDS/{parameterValue}")]
        public List<ResultModel> GetDS(int parameterValue)
        {
            var result = db.Database.SqlQuery<ResultModel>(@"select STRING_AGG(d.product_name, ', ') AS ProductList, a.order_total_price, a.date, e.state_name, a.order_state as state_id, a.order_id 
                            from tbl_Order a left join tbl_orderDetail b on a.order_id = b.oder_id
                            left join tbl_productColor c on b.productColor_id = c.id
                            left join tbl_product d on c.product_id = d.product_id
                            left join tbl_state e on a.order_state = e.state_id
                            where a.user_id = @ParamValue 
                            group by a.order_id, a.date, e.state_name, a.order_total_price, a.order_state,a.order_id", new SqlParameter("@ParamValue", parameterValue)).ToList();
            return result;
        }
        //Lấy ra thông tin cho user đang đăng nhập
        [HttpGet]
        [Route("ProfileById/{userid}")]
        public Itemprofile ProfileById(int userid)
        {
            var item = db.Database.SqlQuery<Itemprofile>(@"select user_name, user_email, user_phone, user_address, isActive, '' as user_status, avatar_img  from tbl_user
                                                        where user_id = @user_id", new SqlParameter("@user_id", userid)).SingleOrDefault();
            if (item.isActive)
            {
                item.user_status = "Đã được kích hoạt";
            }
            return item;
        }
        #endregion

        #region API cập nhật dữ liệu
        //Cập nhật ảnh
        [HttpPost]
        [Route("api/upload/avatar")]
        public IHttpActionResult UploadImage()
        {
            try
            {
                
                var httpRequest = System.Web.HttpContext.Current.Request;
                string currentDirectory = httpRequest.PhysicalApplicationPath;
                var file = httpRequest.Files[0];
                var user_id = httpRequest.Form["user_id"];
                currentDirectory = currentDirectory.Replace('\\', '/');
                // Lưu ảnh vào thư mục
                string imagePath = currentDirectory  + "images/avatar_img_" + user_id.ToString() + ".jpg";

                using (var stream = new FileStream(imagePath, FileMode.Create))
                {
                    file.InputStream.CopyTo(stream);
                }
                string avatar_img = "/images/avatar_img_" + user_id.ToString() + ".jpg";
                db.Database.ExecuteSqlCommand("UPDATE tbl_user SET avatar_img = @avatar_img WHERE user_id = @user_id", new SqlParameter("@user_id", user_id),
                            new SqlParameter("@avatar_img", avatar_img));

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        //Cập nhật thông tin
        [HttpPost]
        [Route("api/upload/profile")]
        public IHttpActionResult Updateprofile()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                if (httpRequest.Form.Count > 0)
                {
                    var user_id = httpRequest.Form["user_id"];
                    var user_name = httpRequest.Form["user_name"];
                    var user_email = httpRequest.Form["user_email"];
                    var user_phone = httpRequest.Form["user_phone"];
                    var user_address = httpRequest.Form["user_address"];
                    db.Database.ExecuteSqlCommand("Update tbl_user SET user_name = @user_name, user_email = @user_email, user_phone = @user_phone, user_address = @user_address where user_id = @user_id",
                                new SqlParameter("@user_id", user_id), new SqlParameter("@user_name", user_name), new SqlParameter("@user_email", user_email),
                                new SqlParameter("@user_phone", user_phone), new SqlParameter("@user_address", user_address));
                    return Ok();
                }
                else return BadRequest("Không thể xử lý dữ liệu");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
        //Cập nhật mật khẩu
        [HttpPost]
        [Route("api/upload/password")]
        public IHttpActionResult ChangePassword()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var user_id = httpRequest.Form["user_id"];
                var pass_new = httpRequest.Form["new_pass"];
                dynamic item = db.Database.SqlQuery<dynamic>(@"select 1  from tbl_user where user_id = @user_id", new SqlParameter("@user_id", user_id)).SingleOrDefault();
                if (item != null)
                {
                    db.Database.ExecuteSqlCommand("UPDATE tbl_user SET user_password = @user_password WHERE user_id = @user_id", new SqlParameter("@user_id", user_id),
                                new SqlParameter("@user_password", pass_new));
                    return Ok();
                }
                else return BadRequest("không tồn tại tài khoản");

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }  
        }
        //Khách hủy đơn hàng
        [HttpPost]
        [Route("api/upload/state_order")]
        public IHttpActionResult ChangeStateOrder()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var order_id = httpRequest.Form["order_id"];
                dynamic item = db.Database.SqlQuery<dynamic>(@"select 1  from tbl_Order where order_id = @order_id", new SqlParameter("@order_id", order_id)).SingleOrDefault();
                if (item != null)
                {
                    db.Database.ExecuteSqlCommand("UPDATE tbl_Order SET order_state =6, date = CURRENT_TIMESTAMP WHERE order_id = @order_id", new SqlParameter("@order_id", order_id));
                    return Ok();
                }
                else return BadRequest("không tồn tại đơn hàng");

            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        #endregion
    }
}
