using System;
using System.Collections.Generic;

namespace TalentNetworDAL.Models;

public partial class AddFaq
{
    public int FaqId { get; set; }

    public int UserId { get; set; }

    public string? Question { get; set; }

    public string? Answer { get; set; }

}
