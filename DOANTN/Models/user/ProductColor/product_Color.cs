using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTL_TTCMWeb.Models.user.ProductColor
{
    public class product_Color
    {
        public int product_id { get; set; }
        public string product_name { get; set; }
        public string product_img { get; set; }
        public string product_code { get; set; }
        public string product_sub_info { get; set; }
        public bool product_isSale { get; set; }
        public string category_name { get; set; }
        public int amount { get; set; }
        public string gia { get; set; }
        public double maxgia { get; set; }
        public double mingia { get; set; }
    }
}