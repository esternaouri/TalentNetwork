using System;
using System.Collections.Generic;

namespace TalentNetworDAL.Models;

public partial class TalentUser
{
    public int UserId { get; set; }

    public string? City { get; set; }

    public int? ContactPhone { get; set; }

    public virtual User User { get; set; } = null!;
}
