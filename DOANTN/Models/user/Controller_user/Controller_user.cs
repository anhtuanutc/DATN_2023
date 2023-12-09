using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BTL_TTCMWeb.Models.user.Controller_user
{
    public class Controller_user
    {
        #region Entity của chức năng
        public class ResultModel
        {
            public string ProductList { get; set; }
            public double order_total_price { get; set; }
            public DateTime Date { get; set; }
            public string state_name { get; set; }
            [NotMapped]
            public int state_id { get; set; }
            [NotMapped]
            public int order_id { get; set; }
        }
        public class Itemprofile
        {
            public string user_name { get; set; }
            public string user_email { get; set; }
            public string user_phone { get; set; }
            public string user_address { get; set; }
            [NotMapped]
            public string avatar_img { get; set; }
            [NotMapped]
            public bool isActive { get; set; }
            [NotMapped]
            public string user_status { get; set; }
        }
        #endregion
    }
}