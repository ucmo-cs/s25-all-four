namespace Backend.Models.Entities
{
    public class TaskUser
    {
        public Guid Id { get; set; }
        public string TaskName { get; set; }
        public DateTime DueDate { get; set; }
        public string CreatedBy { get; set; }
        public string Owner { get; set; }
        public string Information { get; set; }
    }
}
