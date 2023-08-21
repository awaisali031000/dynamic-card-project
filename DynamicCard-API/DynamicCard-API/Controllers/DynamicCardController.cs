using DynamicCard_API.Data;
using DynamicCard_API.Managers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DynamicCard_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DynamicCardController : ControllerBase
    {
        private readonly IDynamicCardManager _dynamicCardManager;

        public DynamicCardController(IDynamicCardManager dynamicCardManager)
        {
            _dynamicCardManager = dynamicCardManager;
        }

        [HttpPost]
        public async Task<IActionResult> PostDynamicCard(DynamicCard dynamicCard)
        {
            var result = await _dynamicCardManager.PostDynamicCard(dynamicCard);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComment(Guid id)
        {
            var result = await _dynamicCardManager.GetComment(id);
            return Ok(result);
        }
    }
}
