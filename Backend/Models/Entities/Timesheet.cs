namespace Backend.Models.Entities
{
    public class Timesheet
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public string Month {  get; set; }
        public List<TimeEntry> timeEntries { get; set; } = new List<TimeEntry>();
    }
}
