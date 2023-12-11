using BTL_TTCMWeb.Models;
using BTL_TTCMWeb.Models.Controller;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BTL_TTCMWeb.Areas.admin.ApiControllers
{
    public class Manage_product_detailsAPIController : ApiController
    {
        HAWContextEntities db = new HAWContextEntities();
        #region Table entity
        public class Item_productColor
        {
            public int id { get; set; }
            public int color_id { get; set; }
            public int product_id { get; set; }
            public string size { get; set; }
            public int amount { get; set; }
            public double product_price { get; set; }
            [NotMapped]
            public string color_name { get; set; }
            [NotMapped]
            public string product_name { get; set; }
        }
        public class Item_size
        {
            public string size { get; set; }
        }
        public class Item_product
        {
            public int product_id { get; set; }
            public string product_name { get; set; }
        }
        public class Item_color
        {
            public int color_id { get; set; }
            public string color_name { get; set; }
        }
        #endregion

        #region API

        #region Lấy dữ liệu
        #region Quản lý size, giá, số lượng tồn
        //Lấy danh sách
        [HttpGet]
        [Route("api/GetDS_Item_productColor")]
        public List<Item_productColor> GetDS()
        {
            var result = db.Database.SqlQuery<Item_productColor>(@"select a.id, a.color_id, a.product_id, a.size, a.amount, a.product_price, b.color_name, c.product_name from tbl_productColor a 
                                                                left join tbl_color b on a.color_id = b.color_id
                                                                left join tbl_product c on a.product_id = c.product_id").ToList();
            return result;
        }
        //Lấy 1 phần tử
        [HttpGet]
        [Route("api/productColorById/{id}")]
        public Item_productColor productColorById(int id)
        {
            var item = db.Database.SqlQuery<Item_productColor>(@"select a.id, a.color_id, a.product_id, a.size, a.amount, a.product_price, b.color_name, c.product_name from tbl_productColor a 
                                                                left join tbl_color b on a.color_id = b.color_id
                                                                left join tbl_product c on a.product_id = c.product_id
                                                                where a.id = @id", new SqlParameter("@id", id)).SingleOrDefault();
            //if (item != null)
            //{
            //    item.user_status = "Đã được kích hoạt";
            //}
            return item;
        }
        #endregion
        #region Lấy các combobox
        [HttpGet]
        [Route("api/GetCombobox/productColor")]
        public List<object> GetCombobox()
        {
            var color_id = db.Database.SqlQuery<Item_color>(@"select color_id, color_name from tbl_color").ToList();
            var product_id = db.Database.SqlQuery<Item_product>(@"select product_id, product_name from tbl_product where product_img is not null or product_img <> ''").ToList();
            var size = db.Database.SqlQuery<Item_size>(@"select distinct size from tbl_productColor ").ToList();
            var result = new
            {
                ColorIdList = color_id,
                ProductIdList = product_id,
                SizeList = size
            };
            return new List<object> { result }; ;
        }
        #endregion
        #endregion

        #region Cập nhật dữ liệu
        #region Quản lý size, giá, số lượng tồn
        //Thêm
        [HttpPost]
        [Route("api/insert/inventory_price")]
        public ResultResponse insert_inventory_price()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                if (httpRequest.Form.Count > 0)
                {
                    int color_id = int.Parse(httpRequest.Form["color_id"]);
                    int product_id = int.Parse(httpRequest.Form["product_id"]);
                    int amount = int.Parse(httpRequest.Form["amount"]);
                    var size = httpRequest.Form["size"];
                    double product_price = double.Parse(httpRequest.Form["product_price"]);
                    dynamic item = db.Database.SqlQuery<dynamic>(@"select 1  from tbl_productColor where color_id = @color_id and product_id = @product_id and size= @size", 
                                    new SqlParameter("@color_id", color_id), new SqlParameter("@product_id", product_id), new SqlParameter("@size", size)).SingleOrDefault();
                    if (item == null)
                    {
                        db.Database.ExecuteSqlCommand(@"INSERT INTO tbl_productColor (color_id, product_id, size, amount, product_price, product_sale, product_discount)
                                                    VALUES(@color_id, @product_id, @size , @amount, @product_price, null,null)",
                                new SqlParameter("@color_id", color_id), new SqlParameter("@product_id", product_id), new SqlParameter("@amount", amount),
                                new SqlParameter("@size", size), new SqlParameter("@product_price", product_price));
                    }else
                    {
                        return new ResultResponse
                        {
                            Success = false,
                            Message = "Đã có dữ liệu tương tự như này, vui lòng thử lại"
                        };
                    }
                    return new ResultResponse
                    {
                        Success = true,
                        Message = "Thêm mới thành công"
                    };
                }
                else
                {
                    return new ResultResponse
                    {
                        Success = false,
                        Message = "Dữ liệu bị lỗi vui lòng thử lại"
                    };
                }
            }
            catch (Exception ex)
            {
                return new ResultResponse
                {
                    Success = false,
                    Message = ex.ToString()
                };
            }

        }
        //Sửa
        [HttpPost]
        [Route("api/upload/inventory_price")]
        public IHttpActionResult Upload_inventory_price()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                if (httpRequest.Form.Count > 0)
                {
                    var id = httpRequest.Form["id"];
                    int amount = int.Parse(httpRequest.Form["amount"]);
                    double product_price = double.Parse(httpRequest.Form["product_price"]);
                    db.Database.ExecuteSqlCommand("Update tbl_productColor SET amount = @amount, product_price = @product_price where id = @id",
                                new SqlParameter("@id", id), new SqlParameter("@amount", amount), new SqlParameter("@product_price", product_price));
                    return Ok();
                }
                else return BadRequest("Không thể xử lý dữ liệu");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
        //Xóa
        [HttpPost]
        [Route("api/delete/inventory_price")]
        public IHttpActionResult Delete_inventory_price()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                if (httpRequest.Form.Count > 0)
                {
                    var id = httpRequest.Form["id"];
                    db.Database.ExecuteSqlCommand("delete tbl_productColor  where id = @id",new SqlParameter("@id", id));
                    return Ok();
                }
                else return BadRequest("Không thể xử lý dữ liệu");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

        }
        #endregion
        #endregion

        #endregion
    }
}
