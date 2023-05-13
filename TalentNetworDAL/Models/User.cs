using System;
using System.Collections.Generic;

namespace TalentNetworDAL.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public int? IsAdmin { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpires { get; set; }

    public int ?PhoneNumber { get; set; }  

    public virtual ICollection<Faq> Faqs { get; set; } = new List<Faq>();

    public virtual ICollection<ProjectsForTalent> ProjectsForTalents { get; set; } = new List<ProjectsForTalent>();

    public virtual TalentUser? TalentUser { get; set; }
}
