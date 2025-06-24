using Microsoft.EntityFrameworkCore;
using CategoriesApi.Data;
using CategoriesApi.Models;

namespace CategoriesApi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<CategoryService> _logger;

        public CategoryService(AppDbContext context, ILogger<CategoryService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            try
            {
                _logger.LogInformation("Attempting to retrieve categories from database");
                
                // Test database connection with timeout
                using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(5));
                await _context.Database.CanConnectAsync(cts.Token);
                
                // Get categories from database
                var categories = await _context.Categories
                    .OrderBy(c => c.Name)
                    .ToListAsync(cts.Token);
                
                _logger.LogInformation("Successfully retrieved {Count} categories from database", categories.Count);
                return categories;
            }
            catch (OperationCanceledException)
            {
                _logger.LogWarning("Database connection timeout. Returning mock data");
                return GetMockCategories();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to retrieve categories from database. Returning mock data");
                return GetMockCategories();
            }
        }

        private List<Category> GetMockCategories()
        {
            _logger.LogInformation("Returning mock categories data");
            
            return new List<Category>
            {
                new Category 
                { 
                    Id = 1, 
                    Name = "Electronics (Mock)",
                },
                new Category 
                { 
                    Id = 2, 
                    Name = "Clothing (Mock)",
                },
                new Category 
                { 
                    Id = 3, 
                    Name = "Books (Mock)",
                },
                new Category 
                { 
                    Id = 4, 
                    Name = "Home & Garden (Mock)",
                },
                new Category 
                { 
                    Id = 5, 
                    Name = "Sports (Mock)",
                },
            };
        }
    }
}
