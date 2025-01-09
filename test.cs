using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System;

class Program
{
    static void Main()
    {
        Emp emp = new Emp { Id = 1, Name = "John", City = "New York" };
        var settings = new JsonSerializerSettings
        {
            ContractResolver = new CustomContractResolver(),
            Formatting = Formatting.Indented
        };
        string json = JsonConvert.SerializeObject(emp, settings);
        Console.WriteLine(json);
        Console.ReadLine();
    }


}
public class Emp
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string City { get; set; }
}

public class CustomContractResolver : DefaultContractResolver
{
    protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
    {
        // Select only the properties to include
        return base.CreateProperties(type, memberSerialization)
                   .Where(p => p.PropertyName != "City")
                   .ToList();
    }
}

