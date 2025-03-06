namespace Backend.Models.Entities
{
    public class Timesheet
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Month {  get; set; }
        public string UserId { get; set; }

    }
}
