namespace DynamicCard_API.Repositories
{
    public interface IDynamicCardRepository
    {
        Task<DynamicCard> PostAndUpdateDynamicCard(DynamicCard dynamicCard);
        Task<List<DynamicCard>> GetComment(Guid sectionId);
    }
}
