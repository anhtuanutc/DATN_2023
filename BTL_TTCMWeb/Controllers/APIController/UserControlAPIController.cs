using BTL_TTCMWeb.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web.Http;

namespace BTL_TTCMWeb.Controllers.APIController
{
    public class UserControlAPIController : ApiController
    {
        HAWContextEntities db = new HAWContextEntities();
        #region Entity của chức năng
        public class ResultModel
        {
            public string ProductList { get; set; }
            public double order_total_price { get; set; }
            public DateTime Date { get; set; } 
            public string state_name { get; set; }
        }
        public class Itemprofile
        {
            public string user_name { get; set; }   
            public string user_email { get; set; }
            public string user_phone { get; set; }   
            public string user_address { get; set; }
            public string avatar_img { get; set; }
            [NotMapped]
            public bool isActive { get; set; } 
            [NotMapped]
            public string user_status { get; set; }
        }
        #endregion

        #region API lấy thông tin
        //Lấy ra danh sách đơn hàng cho chức năng theo dõi đơn hàng
        [HttpGet]
        [Route("GetDS/{parameterValue}")]
        public List<ResultModel> GetDS(int parameterValue)
        {
            var result = db.Database.SqlQuery<ResultModel>(@"select STRING_AGG(d.product_name, ', ') AS ProductList, a.order_total_price, a.date, e.state_name 
                            from tbl_Order a left join tbl_orderDetail b on a.order_id = b.oder_id
                            left join tbl_productColor c on b.productColor_id = c.id
                            left join tbl_product d on c.product_id = d.product_id
                            left join tbl_state e on a.order_state = e.state_id
                            where a.user_id = @ParamValue 
                            group by a.order_id, a.date, e.state_name, a.order_total_price", new SqlParameter("@ParamValue", parameterValue)).ToList();
            return result;
        }
        //Lấy ra thông tin cho user đang đăng nhập
        [HttpGet]
        [Route("ProfileById/{userid}")]
        public  Itemprofile ProfileById(int userid)
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
                var file = httpRequest.Files[0];
                var user_id = httpRequest.Form["user_id"];
                // Lưu ảnh vào thư mục
                string imagePath = "D:/Bài tập lớn/Web bán tranh/BTL_TTCMWeb/BTL_TTCMWeb/" + "/images/avatar_img_" + user_id.ToString() + ".jpg"; 

                using(var stream = new FileStream(imagePath, FileMode.Create))
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
        public int Updateprofile([FromBody] string data)
        {
            db.Database.ExecuteSqlCommand("Update tbl_user SET user");
            return 1;
        }
        //Cập nhật mật khẩu
        [HttpGet]
        [Route("ChangePassword/{pass_old}/{user_id}/{pass_new}")]
        public int ChangePassword(string pass_old, int user_id, string pass_new)
        {
            int check = 0;
            dynamic item = db.Database.SqlQuery<dynamic>(@"select 1  from tbl_user where user_id = @user_id and user_password = @pass_old", new SqlParameter("@user_id", user_id), new SqlParameter("@pass_old", pass_old)).SingleOrDefault();
            if(item != null)
            {
                db.Database.ExecuteSqlCommand("UPDATE tbl_user SET user_password = @user_password WHERE user_id = @user_id", new SqlParameter("@user_id", user_id),
                            new SqlParameter("@user_password", pass_new));
                //DeleteAllCookies();
                //DeleteSession();
                return 1;
            }else return 0;
        }
        //[HttpGet]
        //[Route("api/DeleteAllCookies")]
        //public IHttpActionResult DeleteAllCookies()
        //{
        //    HttpCookieCollection cookies = HttpContext.Current.Request.Cookies;

        //    foreach (string cookieName in cookies.AllKeys)
        //    {
        //        HttpCookie cookie = new HttpCookie(cookieName);
        //        cookie.Expires = DateTime.Now.AddDays(-1);
        //        HttpContext.Current.Response.Cookies.Add(cookie);
        //    }

        //    return Ok("Tất cả các Cookie đã được xóa");
        //}
        #endregion
    }
}
