using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Admin_Backend.Models
{
    [Table("audit_log")]
    public partial class AuditLog
    {
        [Key]
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
