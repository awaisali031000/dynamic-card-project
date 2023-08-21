using DynamicCard_API.Data;
using Microsoft.EntityFrameworkCore;

namespace DynamicCard_API.Repositories
{
    public class DynamicCardRepository : IDynamicCardRepository
    {
        private readonly DataContext _context;

        public DynamicCardRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<DynamicCard> PostAndUpdateDynamicCard(DynamicCard dynamicCard)
        {
            try
            {
                dynamicCard.SectionId = Guid.Parse("fa958bf7-9d40-4192-b8ef-6057b67a8a28");
                dynamicCard.SectionType = dynamicCard.SectionType;
                dynamicCard.CreatedBy = "Awais";

                _context.DynamicCards.Add(dynamicCard);
                await _context.SaveChangesAsync();
                return dynamicCard;
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred: {ex.Message}");
            }
        }
        public async Task<List<DynamicCard>> GetComment(Guid sectionId)
        {
            var dynamicCards = await _context.DynamicCards
                .Where(x => x.SectionId == sectionId)
                .ToListAsync();

            return dynamicCards;
        }
    }
}
