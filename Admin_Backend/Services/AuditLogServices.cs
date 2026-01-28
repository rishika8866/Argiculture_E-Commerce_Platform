using Admin_Backend.Models;
using System;

namespace Admin_Module.Services
{
    public class AuditLogService
    {
        private readonly p25_efarmingdbContext _context;

        public AuditLogService(p25_efarmingdbContext context)
        {
            _context = context;
        }

        public void LogAction(string action, string tableName, int recordId, string performedBy)
        {
            var log = new AuditLog
            {
                ActionType = action,
                TableName = tableName,
                RecordId = recordId,
                ActionBy = performedBy,
                ActionDate = DateTime.UtcNow
            };

            _context.AuditLogs.Add(log);
            _context.SaveChanges();
        }
    }
}
