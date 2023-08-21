namespace DynamicCard_API
{
    public class DynamicCard
    {
        public Guid? SectionId { get; set; }
        public Guid DynamicCardId { get; set; }
        public string? SectionType { get; set; } = string.Empty;
        public bool Agree { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public string Comment { get; set; }
    }
}
