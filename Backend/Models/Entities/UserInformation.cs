using System.ComponentModel.DataAnnotations;

namespace Backend.Models.Entities
{
    public class UserInformation
    {
        public Guid Id { get; set; }
        [Required]
        public  string Username { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        public string? NickName { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        [Required]
        public string Position { get; set; }
        public DateTime? Birthday { get; set; }
        public string? Information { get; set; }
        public string? SecurityCode { get; set; }
        public bool LoggedIn { get; set; }
        public string? Team {  get; set; }        
        public UserInformation()
        {
            SecurityCode = CreateSecurityCode();
        }
        public string CreateSecurityCode()
        {
            string encryptedWord = "xx9xxX-xAax-3xXxxx";
            char[] encryptedWordChar = encryptedWord.ToCharArray();
            Random random = new Random();

            for (int i = 0; i < encryptedWordChar.Length; i++)
            {
                if (i != 6 && i != 11)
                {
                    int randomNumber = random.Next(1, 5);
                    encryptedWordChar[i] = (char)(encryptedWordChar[i] + randomNumber);
                }
            }

            return new string(encryptedWordChar);
        }
    }

}
