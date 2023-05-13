using System;
using System.Collections.Generic;

namespace TalentNetworDAL.Models;

public partial class ProjectsForTalent
{
    public int ProjectId { get; set; }

    public int UserId { get; set; }

    public string? ProjectName { get; set; }

    public int? ProjectPrice { get; set; }

    public virtual User User { get; set; } = null!;
}
