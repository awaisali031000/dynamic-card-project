using DynamicCard_API.Repositories;

namespace DynamicCard_API.Managers
{
    public class DynamicCardManager : IDynamicCardManager
    {
        private readonly IDynamicCardRepository _dynamicCardRepository;

        public DynamicCardManager(IDynamicCardRepository dynamicCardRepository)
        {
            _dynamicCardRepository = dynamicCardRepository;
        }
        public async Task<DynamicCard> PostDynamicCard(DynamicCard dynamicCard)
        {
            var result = await _dynamicCardRepository.PostAndUpdateDynamicCard(dynamicCard);
            return result;
        }

        public async Task<List<DynamicCard>> GetComment(Guid sectionId)
        {
            var result = await _dynamicCardRepository.GetComment(sectionId);
            return result;
        }
    }
}

