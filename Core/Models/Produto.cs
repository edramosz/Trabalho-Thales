﻿using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class Produto
    {
        
        public string Id { get; set; }
        [Required] public string Nome { get; set; }
        public decimal Preco { get; set; }
        public string Descricao { get; set; }
        public string UrlImagem { get; set; }
        public string Categoria { get; set; } // Exemplo: "Roupas", "Acessórios"
        public int Estoque { get; set; }
        public string Tamanho { get; set; }
        public string Material { get; set; }
        public string Cor { get; set; }
        public string Genero { get; set; }
        public string Tipo { get; set; }      // Para acessórios (Exemplo: "Relógio", "Colar")
        public string Marca { get; set; }
    }
}
