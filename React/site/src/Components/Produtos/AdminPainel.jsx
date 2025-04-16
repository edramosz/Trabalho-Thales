import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Db/FireBase";
import './AdminPainel.css';

const AdminPainel = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("https://localhost:7294/Produto");
        if (!response.ok) {
          throw new Error("Erro ao carregar produtos.");
        }
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        setErro("Não foi possível carregar os produtos.");
        console.error(error);
      }
    };

    fetchProdutos();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("nomeUsuario");
      localStorage.removeItem("isAdmin");
      navigate("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    console.log("Excluindo produto com ID:", id); // Adicione este log
    try {
      const response = await fetch(`https://localhost:7294/Produto/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Erro ao excluir produto.");
      }
  
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (error) {
      setErro("Erro ao excluir o produto.");
      console.error(error);
    }
  };
  

  return (
    <div className="admin-panel">
      <h2>Painel de Administração</h2>
      <button onClick={handleLogout} className="logout-btn">Sair</button>
      
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      
      <h3>Lista de Produtos</h3>
      <button onClick={() => navigate("/admin/adicionar-produto")}>Adicionar Produto</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan="5">Nenhum produto encontrado.</td>
            </tr>
          ) : (
            produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{produto.preco}</td>
                <td>{produto.descricao}</td>
                <td>
                  <button onClick={() => navigate(`/Admin/editar-produto/${produto.id}`)}>Editar</button>
                  <button onClick={() => handleDeleteProduct(produto.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPainel;
