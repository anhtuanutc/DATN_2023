using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BTL_TTCMWeb.Models.admin.Controller_user
{
    public class Controller_user
    {
        #region Table data entity
        public class ProfileUser
        {
            public int user_id { get; set; }

            public string user_name { get; set; }

            public string user_email { get; set; }

            public string user_phone { get; set; }

            public string user_address { get; set; }

            public string user_password { get; set; }

            public System.Nullable<System.DateTime> CreatedAt { get; set; }

            public bool isActive { get; set; }

            public System.Nullable<System.DateTime> time { get; set; }

            public System.Nullable<int> question_id { get; set; }

            public string answer { get; set; }

            public string remember_me_identify { get; set; }

            public string remember_me_token { get; set; }

            public string avatar_img { get; set; }

            public System.Nullable<int> SoLanMua { get; set; }
        }
        #endregion
    }
}