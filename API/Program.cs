using Core.Interfaces;
using API.Services;
using Core.Models.DTO_s;

var builder = WebApplication.CreateBuilder(args);

// Adiciona controllers
builder.Services.AddControllers();

// Configura o AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Registro dos servi�os (Singleton e Scoped ao mesmo tempo n�o � necess�rio)
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IProdutoService, ProdutoService>();
builder.Services.AddScoped<IFuncionarioService, FuncionarioService>();
builder.Services.AddScoped<IEnderecoService, EnderecoService>();
builder.Services.AddScoped<ITransacaoService, TransacaoService>();
builder.Services.AddScoped<IVendaService, VendaService>();
builder.Services.AddScoped<ICarrinhoService, CarrinhoService>();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

// Configura��o do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTudo", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Porta do seu frontend Vite/React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Redirecionamento para HTTPS
app.UseHttpsRedirection();

// Aplicar o CORS sempre, independente do ambiente
app.UseCors("PermitirTudo");

// Swagger apenas no modo de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Autoriza��o (caso voc� venha a usar [Authorize])
app.UseAuthorization();

// Mapear os endpoints dos controllers
app.MapControllers();

// Inicia o app
app.Run();
