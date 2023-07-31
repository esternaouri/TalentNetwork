using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TalentNetworDAL.Models;

public partial class Faq
{
    public int FaqId { get; set; }

    public int UserId { get; set; }
    [Column(TypeName = "nvarchar(max)")]

    public string? Question { get; set; }
    [Column(TypeName = "nvarchar(max)")]

    public string? Answer { get; set; }

    public virtual User User { get; set; } = null!;
}
