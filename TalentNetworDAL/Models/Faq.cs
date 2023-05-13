using System;
using System.Collections.Generic;

namespace TalentNetworDAL.Models;

public partial class Faq
{
    public int FaqId { get; set; }

    public int UserId { get; set; }

    public string? Question { get; set; }

    public string? Answer { get; set; }

    public virtual User User { get; set; } = null!;
}
