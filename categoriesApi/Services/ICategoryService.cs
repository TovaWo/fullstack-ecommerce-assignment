using CategoriesApi.Models;

namespace CategoriesApi.Services
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategoriesAsync();
    }
}