using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TalentNetworDAL.Models;

public partial class ProjectsForTalent
{
    public int ProjectId { get; set; }

    public int UserId { get; set; }
    [Column(TypeName = "nvarchar(max)")]

    public string? ProjectName { get; set; }

    public int? ProjectPrice { get; set; }

    public virtual User User { get; set; } = null!;
}
