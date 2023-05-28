using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TalentNetworDAL.Models;

public partial class TalentNetworkContext : DbContext
{
    public TalentNetworkContext()
    {
    }

    public TalentNetworkContext(DbContextOptions<TalentNetworkContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Faq> Faqs { get; set; }

    public virtual DbSet<ProjectsForTalent> ProjectsForTalents { get; set; }

    public virtual DbSet<TalentUser> TalentUsers { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       // optionsBuilder.EnableSensitiveDataLogging();

        optionsBuilder.UseSqlServer("Data Source=DESKTOP-MNQDAU5\\SQLEXPRESS;Initial Catalog=TalentNetwork;Integrated Security=True; trustservercertificate=true");

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Faq>(entity =>
        {
            entity.Property(e => e.FaqId)
                .ValueGeneratedNever()
                .HasColumnName("FaqID");
            entity.Property(e => e.Answer)
                .HasMaxLength(1213565468)
                .IsFixedLength();
            entity.Property(e => e.Question)
                .HasMaxLength(1213565468)
                .IsFixedLength();

            entity.HasOne(d => d.User).WithMany(p => p.Faqs)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Faqs_Users");
        });

        modelBuilder.Entity<ProjectsForTalent>(entity =>
        {
            entity.HasKey(e => e.ProjectId);

            entity.Property(e => e.ProjectId).ValueGeneratedNever();
            entity.Property(e => e.ProjectName)
                .HasMaxLength(1423654)
                .IsFixedLength();
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.ProjectsForTalents)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ProjectsForTalents_Users");
        });

        modelBuilder.Entity<TalentUser>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.City)
                .HasMaxLength(10)
                .IsFixedLength();

            entity.HasOne(d => d.User).WithOne(p => p.TalentUser)
                .HasForeignKey<TalentUser>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TalentUsers_Users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.UserId).ValueGeneratedNever();
            entity.Property(e => e.UserName)
                .HasMaxLength(10)
                .IsFixedLength();
        });
       modelBuilder.Entity<User>().HasData(new User[]
     {
     //       password=1111
          new User {  UserId = 1, UserName = "admin", Password = "AQAAAAEAACcQAAAAEF0yg+txDUNebuNSw+ieaIC/H0Xeu+MUqB/doLTDmBR59cwAl+QwMkMftjY2SMh7ww==", IsAdmin = 1 },
            new User { UserId =11, UserName = "u1", Password = "AQAAAAEAACcQAAAAEF0yg+txDUNebuNSw+ieaIC/H0Xeu+MUqB/doLTDmBR59cwAl+QwMkMftjY2SMh7ww==", IsAdmin = 2},
     });
       modelBuilder.Entity<TalentUser>().HasData(new TalentUser[]
     {
           
            new TalentUser { UserId=1, City = "Jerusalem", ContactPhone = 0528887454, Talent = "javaScript devloper" },
            new TalentUser { UserId=11, City = "Tel-Aviv", ContactPhone = 1354550453, Talent = "AI devlopper"},

     });
        modelBuilder.Entity<Faq>().HasData(new Faq[]
    {

            new Faq {FaqId=15, UserId=1, Question="How-long does it take to fins project? ",Answer="4 weeks" },
            new Faq {FaqId=5, UserId=1, Question="How--much experience do you have?",Answer="7 years" },
            new Faq {FaqId=6, UserId=11, Question="How-long does it take to finsh projec? ",Answer="8 weeks" },
            new Faq {FaqId=7, UserId=11, Question="Ho-long does it take to finsh projec? ",Answer="17 years" },
            new Faq {FaqId=59, UserId=11, Question="Ho-long finsh projec? ",Answer="17 years" },

    });
       modelBuilder.Entity<ProjectsForTalent>().HasData(new ProjectsForTalent[]
    {

            new ProjectsForTalent {ProjectId=1, UserId=1, ProjectName="a proj", ProjectPrice=10000 },
            new ProjectsForTalent { ProjectId=2,UserId=1, ProjectName="b proj" ,ProjectPrice=5000 },
            new ProjectsForTalent { ProjectId=3,UserId=11, ProjectName="c proj ", ProjectPrice =14000 },
            new ProjectsForTalent { ProjectId=4,UserId=11, ProjectName="d proj", ProjectPrice=54 },
            
    });
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
