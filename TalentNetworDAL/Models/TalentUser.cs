using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TalentNetworDAL.Models;

public partial class TalentUser
{

    public int UserId { get; set; }

    public string? City { get; set; }

    public int? ContactPhone { get; set; }
    public string ? Talent { get; set; }
    public string? ImageName { get; set; }
    
   public byte[]? ImageDataByte { get; set; }

    public string? ImageDataToUse { get; set; }

    public virtual User User { get; set; } = null!;
}
