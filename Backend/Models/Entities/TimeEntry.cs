namespace Backend.Models.Entities
{
    public class TimeEntry
    {
        public Guid Id { get; set; }
        public int Day { get; set; }
        public double HoursWorked { get; set; }
        public Guid TimeSheetId { get; set; }
        public Timesheet Timesheet { get; set; }
    }
}
