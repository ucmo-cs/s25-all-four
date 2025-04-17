namespace Backend.Models.Entities
{
    public class Project
    {
       public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string TeamID { get; set; }
        public string OwnerID { get; set; }
        public string CreatorID { get; set; }

    }
}
