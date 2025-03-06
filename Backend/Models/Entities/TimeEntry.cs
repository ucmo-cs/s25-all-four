namespace Backend.Models.Entities
{
    public class TimeEntry
    {
        public Guid Id { get; set; }
        public int Day { get; set; }              
        public int HoursWorked { get; set; }      
        public string TimesheetId { get; set; }
        public string UserId { get; set; }
    }
}
