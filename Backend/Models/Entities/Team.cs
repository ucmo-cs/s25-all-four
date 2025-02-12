using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Entities
{
    public class Team
    {
        public Guid Id { get; set; }
        public string TeamName { get; set; }
        public string TeamDescription { get; set; }
        public int TeamSize { get; set; }
        public string TeamManager {  get; set; }
    }
}
