using TalentNetworDAL.Models;

namespace TalentNetwork.DTO
{
    public class UserResponse
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int IsAdmin { get; set; }
        public string RoleName { get; set; }


        public UserResponse() { }

        public UserResponse(User user)
        {
            UserId = user.UserId;
            UserName = user.UserName;
            IsAdmin = (int)user.IsAdmin;
            RoleName = IsAdmin == 1 ? "Admin" : "User";


        }

    }
}