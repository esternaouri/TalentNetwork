﻿using System;
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
                .HasMaxLength(68)
                .IsFixedLength();
            entity.Property(e => e.Question)
                .HasMaxLength(68)
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
                .HasMaxLength(10)
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
          new User { UserId = 1, UserName = "admin", Password = "AQAAAAEAACcQAAAAEF0yg+txDUNebuNSw+ieaIC/H0Xeu+MUqB/doLTDmBR59cwAl+QwMkMftjY2SMh7ww==", IsAdmin = 1 },
            new User { UserId =11, UserName = "u1", Password = "AQAAAAEAACcQAAAAEF0yg+txDUNebuNSw+ieaIC/H0Xeu+MUqB/doLTDmBR59cwAl+QwMkMftjY2SMh7ww==", IsAdmin = 2},
     });
       modelBuilder.Entity<TalentUser>().HasData(new TalentUser[]
     {
           
            new TalentUser { UserId=1, City = "Jerusalem", ContactPhone = 0528887454, Talent = "javaScript devloper" },
            new TalentUser { UserId=11, City = "Tel-Aviv", ContactPhone = 1354550453, Talent = "AI devlopper"},

     });
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
