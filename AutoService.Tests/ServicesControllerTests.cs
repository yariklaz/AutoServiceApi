using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoServiceAPI.Controllers; 
using AutoServiceAPI.Models;      
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace AutoService.Tests
{
    public class ServicesControllerTests
    {
        // Метод-помічник для створення фейкової бази даних в оперативній пам'яті
        private AutoServiceContext GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<AutoServiceContext>()
                .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString())
                .Options;

            var databaseContext = new AutoServiceContext(options);
            databaseContext.Database.EnsureCreated();

            return databaseContext;
        }

        [Fact]
        public async Task GetServices_ReturnsAllServices_Successfully()
        {
            // 1. Arrange (Підготовка даних)
            var context = GetDatabaseContext();

            // Додаємо дві тестові послуги у фейкову базу
            context.Services.Add(new Service { Id = 1, Name = "Тест Послуга 1", Price = 500, Description = "Опис 1" });
            context.Services.Add(new Service { Id = 2, Name = "Тест Послуга 2", Price = 1000, Description = "Опис 2" });
            await context.SaveChangesAsync();

            // Створюємо контролер, передаючи йому фейкову базу
            var controller = new ServicesController(context);

            // 2. Act (Виконання дії, яку ми тестуємо)
            var result = await controller.GetServices();

            // 3. Assert (Перевірка результату)
            // Перевіряємо, чи повернувся правильний тип даних
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Service>>>(result);

            // Витягуємо самі дані і перевіряємо, чи їх рівно 2 (як ми і додавали)
            var returnValue = Assert.IsType<List<Service>>(actionResult.Value);
            Assert.Equal(2, returnValue.Count);
            Assert.Equal("Тест Послуга 1", returnValue[0].Name);
        }
    }
}