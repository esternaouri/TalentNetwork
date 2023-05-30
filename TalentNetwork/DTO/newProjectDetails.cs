using TalentNetworDAL.Models;

namespace TalentNetwork.DTO
{
    public class NewProjectDetails
    {

        public int UserId { get; set; }

        public string? ProjectName { get; set; }

        public int? ProjectPrice { get; set; }

       public int  ProjectId { get; set; }
         
    }
}
