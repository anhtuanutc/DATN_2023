//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BTL_TTCMWeb.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_productColor
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tbl_productColor()
        {
            this.tbl_cartDetail = new HashSet<tbl_cartDetail>();
            this.tbl_orderDetail = new HashSet<tbl_orderDetail>();
        }
    
        public int id { get; set; }
        public int color_id { get; set; }
        public int product_id { get; set; }
        public string size { get; set; }
        public int amount { get; set; }
        public Nullable<double> product_price { get; set; }
        public Nullable<double> product_sale { get; set; }
        public Nullable<double> product_discount { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_cartDetail> tbl_cartDetail { get; set; }
        public virtual tbl_color tbl_color { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tbl_orderDetail> tbl_orderDetail { get; set; }
        public virtual tbl_product tbl_product { get; set; }
    }
}