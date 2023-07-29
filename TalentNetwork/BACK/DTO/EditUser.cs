using Microsoft.CodeAnalysis;
using Microsoft.AspNetCore.StaticFiles;

namespace TalentNetwork.DTO
{
    public class EditUser
    {

        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int? IsAdmin{ get; set; }
    }
}