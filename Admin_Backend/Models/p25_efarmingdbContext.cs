using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Admin_Backend.Models
{
    public partial class p25_efarmingdbContext : DbContext
    {
        public p25_efarmingdbContext()
        {
        }

        public p25_efarmingdbContext(DbContextOptions<p25_efarmingdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AuditLog> AuditLogs { get; set; }
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductSeller> ProductSellers { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<SubCategory> SubCategories { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root123;database=p25_efarmingdb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.42-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.CatId)
                    .HasName("PRIMARY");

                entity.ToTable("category");

                entity.HasIndex(e => e.CatName, "cat_name")
                    .IsUnique();

                entity.Property(e => e.CatId).HasColumnName("cat_id");

                entity.Property(e => e.CatName).HasColumnName("cat_name");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("city");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.CityId1).HasColumnName("city_id");

                entity.Property(e => e.Cityname)
                    .HasMaxLength(255)
                    .HasColumnName("cityname");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Oid)
                    .HasName("PRIMARY");

                entity.ToTable("orders");

                entity.HasIndex(e => e.Uid, "uid");

                entity.Property(e => e.Oid).HasColumnName("oid");

                entity.Property(e => e.ODate).HasColumnName("o_date");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .HasColumnName("status");

                entity.Property(e => e.TotalAmount).HasColumnName("total_amount");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("orders_ibfk_1");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => e.Odid)
                    .HasName("PRIMARY");

                entity.ToTable("order_details");

                entity.HasIndex(e => e.Pid, "FK73p53gb2q7jtgcw6744rjj9ko");

                entity.HasIndex(e => e.PsId, "FKp2le36242kk6ou4cuergm7di2");

                entity.HasIndex(e => e.Oid, "oid");

                entity.Property(e => e.Odid).HasColumnName("odid");

                entity.Property(e => e.Amt).HasColumnName("amt");

                entity.Property(e => e.Oid).HasColumnName("oid");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.Property(e => e.PsId).HasColumnName("ps_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.OidNavigation)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.Oid)
                    .HasConstraintName("order_details_ibfk_1");

                entity.HasOne(d => d.PidNavigation)
                    .WithMany(p => p.OrderDetailPidNavigations)
                    .HasForeignKey(d => d.Pid)
                    .HasConstraintName("FK73p53gb2q7jtgcw6744rjj9ko");

                entity.HasOne(d => d.Ps)
                    .WithMany(p => p.OrderDetailPs)
                    .HasForeignKey(d => d.PsId)
                    .HasConstraintName("order_details_ibfk_2");

                entity.HasOne(d => d.PsNavigation)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.PsId)
                    .HasConstraintName("FKp2le36242kk6ou4cuergm7di2");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasKey(e => e.PId)
                    .HasName("PRIMARY");

                entity.ToTable("payment");

                entity.HasIndex(e => e.Oid, "oid");

                entity.Property(e => e.PId).HasColumnName("p_id");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.Oid).HasColumnName("oid");

                entity.Property(e => e.TotalAmt).HasColumnName("total_amt");

                entity.HasOne(d => d.OidNavigation)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.Oid)
                    .HasConstraintName("payment_ibfk_1");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Pid)
                    .HasName("PRIMARY");

                entity.ToTable("product");

                entity.HasIndex(e => e.CatId, "cat_id");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.Property(e => e.CatId).HasColumnName("cat_id");

                entity.Property(e => e.Pname)
                    .HasMaxLength(255)
                    .HasColumnName("pname");

                entity.HasOne(d => d.Cat)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CatId)
                    .HasConstraintName("product_ibfk_1");
            });

            modelBuilder.Entity<ProductSeller>(entity =>
            {
                entity.HasKey(e => e.PsId)
                    .HasName("PRIMARY");

                entity.ToTable("product_seller");

                entity.HasIndex(e => e.PId, "p_id");

                entity.HasIndex(e => e.UId, "u_id");

                entity.Property(e => e.PsId).HasColumnName("ps_id");

                entity.Property(e => e.Available)
                    .HasColumnType("bit(1)")
                    .HasColumnName("available");

                entity.Property(e => e.PId).HasColumnName("p_id");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Qty).HasColumnName("qty");

                entity.Property(e => e.UId).HasColumnName("u_id");

                entity.HasOne(d => d.PIdNavigation)
                    .WithMany(p => p.ProductSellers)
                    .HasForeignKey(d => d.PId)
                    .HasConstraintName("product_seller_ibfk_1");

                entity.HasOne(d => d.UIdNavigation)
                    .WithMany(p => p.ProductSellers)
                    .HasForeignKey(d => d.UId)
                    .HasConstraintName("product_seller_ibfk_2");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Rid)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.HasIndex(e => e.Rname, "rname")
                    .IsUnique();

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Rname).HasColumnName("rname");
            });

            modelBuilder.Entity<SubCategory>(entity =>
            {
                entity.HasKey(e => e.ScId)
                    .HasName("PRIMARY");

                entity.ToTable("sub_category");

                entity.HasIndex(e => e.CatId, "cat_id");

                entity.HasIndex(e => e.ScName, "sc_name")
                    .IsUnique();

                entity.Property(e => e.ScId).HasColumnName("sc_id");

                entity.Property(e => e.CatId).HasColumnName("cat_id");

                entity.Property(e => e.ScName)
                    .HasMaxLength(100)
                    .HasColumnName("sc_name");

                entity.HasOne(d => d.Cat)
                    .WithMany(p => p.SubCategories)
                    .HasForeignKey(d => d.CatId)
                    .HasConstraintName("sub_category_ibfk_1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Uid)
                    .HasName("PRIMARY");

                entity.ToTable("user");

                entity.HasIndex(e => e.AccNo, "acc_no")
                    .IsUnique();

                entity.HasIndex(e => e.CityId, "city_id");

                entity.HasIndex(e => e.Email, "email")
                    .IsUnique();

                entity.HasIndex(e => e.Rid, "rid");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.AccNo).HasColumnName("acc_no");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.Property(e => e.ContactNo)
                    .HasMaxLength(255)
                    .HasColumnName("contact_no");

                entity.Property(e => e.Email).HasColumnName("email");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Uname)
                    .HasMaxLength(255)
                    .HasColumnName("uname");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("user_ibfk_2");

                entity.HasOne(d => d.RidNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Rid)
                    .HasConstraintName("user_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
