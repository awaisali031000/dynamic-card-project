namespace DynamicCard_API.Managers
{
    public interface IDynamicCardManager
    {
        Task<DynamicCard> PostDynamicCard(DynamicCard dynamicCard);
        Task<List<DynamicCard>> GetComment(Guid sectionId);
    }
}
