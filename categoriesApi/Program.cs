 using Microsoft.EntityFrameworkCore;
using CategoriesApi.Data;
using CategoriesApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Category API", Version = "v1" });
  //  c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "CategoriesApi.xml"), true);
});

// Add Entity Framework with SQL Server
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlOptions => sqlOptions.CommandTimeout(30) // 30 seconds timeout
    ));

// Add Category Service
builder.Services.AddScoped<ICategoryService, CategoryService>();

// Add CORS (optional)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Category API v1");
        c.RoutePrefix = string.Empty; // Makes Swagger available at root
    });
}

// app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();