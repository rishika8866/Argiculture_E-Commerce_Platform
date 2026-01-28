using Admin_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Linq;

namespace Admin_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly p25_efarmingdbContext _context;

        public AdminController(p25_efarmingdbContext context)
        {
            _context = context;
        }

        // ------------------------------
        // 1. Get all customers
        // ------------------------------
        [HttpGet("customers")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllCustomers()
        {
            var customers = await _context.Users
                .Include(u => u.RidNavigation)
                .Where(u => u.RidNavigation != null && u.RidNavigation.Rname == "Customer")
                .Select(u => new UserDto
                {
                    Uid = u.Uid,
                    Uname = u.Uname,
                    Email = u.Email,
                    ContactNo = u.ContactNo,
                    AccNo = u.AccNo,
                    Address = u.Address,
                    Role = u.RidNavigation != null ? u.RidNavigation.Rname : null,
                    CityId = u.CityId
                })
                .ToListAsync();

            return Ok(customers);
        }

        // ------------------------------
        // 2. Get all fatrmers (sellers)
        // ------------------------------
        [HttpGet("farmers")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllFarmers()
        {
            var farmers = await _context.Users
                .Include(u => u.RidNavigation)
                .Where(u => u.RidNavigation != null && u.RidNavigation.Rname == "Seller")
                .Select(u => new UserDto
                {
                    Uid = u.Uid,
                    Uname = u.Uname,
                    Email = u.Email,
                    ContactNo = u.ContactNo,
                    AccNo = u.AccNo,
                    Address = u.Address,
                    Role = u.RidNavigation != null ? u.RidNavigation.Rname : null,
                    CityId = u.CityId
                })
                .ToListAsync();

            return Ok(farmers);
        }

        // ------------------------------
        // 3. Get all products (with sellers)
        // ------------------------------
        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProducts()
        {
            var products = await _context.Products
                .Include(p => p.Cat)
                .Include(p => p.ProductSellers)
                    .ThenInclude(ps => ps.UIdNavigation)
                .Select(p => new ProductDto
                {
                    Pid = p.Pid,
                    Pname = p.Pname,
                    Category = p.Cat != null ? p.Cat.CatName : null,
                    Sellers = p.ProductSellers.Select(ps => new SellerDto
                    {
                        PsId = ps.PsId,
                        Price = ps.Price,
                        Qty = ps.Qty,
                        SellerId = ps.UId,
                        SellerName = ps.UIdNavigation != null ? ps.UIdNavigation.Uname : null,
                        Available = (ps.Available == 1UL) // ps.Available is ulong? in your model
                    }).ToList()
                })
                .ToListAsync();

            return Ok(products);
        }

        // ------------------------------
        // 4. Get audit logs (filtering + CSV)
        // ------------------------------
        // Query params:
        //  actionType (string), tableName (string),
        //  startDate (yyyy-MM-dd or full ISO), endDate, downloadCsv (bool)
        [HttpGet("audit-logs")]
        public async Task<IActionResult> GetAuditLogs(
            [FromQuery] string? actionType,
            [FromQuery] string? tableName,
            [FromQuery] DateTime? startDate,
            [FromQuery] DateTime? endDate,
            [FromQuery] bool downloadCsv = false)
        {
            var query = _context.AuditLogs.AsQueryable();

            if (!string.IsNullOrWhiteSpace(actionType))
                query = query.Where(a => a.ActionType == actionType);

            if (!string.IsNullOrWhiteSpace(tableName))
                query = query.Where(a => a.TableName == tableName);

            if (startDate.HasValue)
                query = query.Where(a => a.ActionDate.HasValue && a.ActionDate.Value >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(a => a.ActionDate.HasValue && a.ActionDate.Value <= endDate.Value);

            var logs = await query
                .OrderByDescending(a => a.ActionDate)
                .Select(a => new AuditLogDto
                {
                    AuditId = a.AuditId,
                    ActionType = a.ActionType,
                    TableName = a.TableName,
                    RecordId = a.RecordId,
                    OldValue = a.OldValue,
                    NewValue = a.NewValue,
                    ActionBy = a.ActionBy,
                    ActionDate = a.ActionDate
                })
                .ToListAsync();

            if (downloadCsv)
            {
                var sb = new StringBuilder();
                sb.AppendLine("AuditId,ActionType,TableName,RecordId,OldValue,NewValue,ActionBy,ActionDate");

                foreach (var l in logs)
                {
                    string Escape(string? s) =>
                        string.IsNullOrEmpty(s) ? "" : $"\"{s.Replace("\"", "\"\"")}\"";

                    var dateStr = l.ActionDate.HasValue ? l.ActionDate.Value.ToString("yyyy-MM-dd HH:mm:ss") : "";
                    sb.AppendLine(
                        $"{l.AuditId},{Escape(l.ActionType)},{Escape(l.TableName)},{l.RecordId},{Escape(l.OldValue)},{Escape(l.NewValue)},{Escape(l.ActionBy)},{Escape(dateStr)}"
                    );
                }

                var bytes = Encoding.UTF8.GetBytes(sb.ToString());
                var fileName = $"audit_logs_{DateTime.UtcNow:yyyyMMdd_HHmmss}.csv";
                return File(bytes, "text/csv", fileName);
            }

            return Ok(logs);
        }

        // ------------------------------
        // DTOs used to avoid cycles & return only needed data
        // ------------------------------
        public class UserDto
        {
            public int Uid { get; set; }
            public string? Uname { get; set; }
            public string? Email { get; set; }
            public string? ContactNo { get; set; }
            public string? AccNo { get; set; }
            public string? Address { get; set; }
            public string? Role { get; set; }
            public int? CityId { get; set; }
        }

        public class ProductDto
        {
            public int Pid { get; set; }
            public string? Pname { get; set; }
            public string? Category { get; set; }
            public List<SellerDto> Sellers { get; set; } = new();
        }

        public class SellerDto
        {
            public int PsId { get; set; }
            public double Price { get; set; }
            public int Qty { get; set; }
            public int? SellerId { get; set; }
            public string? SellerName { get; set; }
            public bool Available { get; set; }
        }

        public class AuditLogDto
        {
            public int AuditId { get; set; }
            public string ActionType { get; set; } = null!;
            public string TableName { get; set; } = null!;
            public int? RecordId { get; set; }
            public string? OldValue { get; set; }
            public string? NewValue { get; set; }
            public string ActionBy { get; set; } = null!;
            public DateTime? ActionDate { get; set; }
        }
    }
}
