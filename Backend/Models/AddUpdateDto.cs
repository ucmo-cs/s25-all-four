namespace Backend.Models
{
    public class AddUpdateDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string AuthorId { get; set; }
        public string TeamId { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsVisible { get; set; }
    }
}
