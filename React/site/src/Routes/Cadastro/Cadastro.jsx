import React, { useState } from 'react'

const Cadastro = () => {
  const [formData, setFormData] = useState({
    NomeCompleto: '',
    Email: '',
    Telefone: '',
    DataNascimento: '',
    SenhaHash: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('Enviando para o back-end:', formData) // <-- Adicionado aqui

    try {
      const response = await fetch('https://localhost:7294/Usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.text(); // lê a resposta como texto se der erro
        console.error('Erro detalhado do servidor:', errorData) // <-- Adicionado aqui
        throw new Error('Erro ao cadastrar usuário')
      }

      const data = await response.json()
      alert('Usuário cadastrado com sucesso!')
      console.log('Resposta do back-end:', data)
    } catch (error) {
      console.error('Erro no catch:', error)
      alert('Erro ao cadastrar usuário.')
    }
  }

  return (
    <div className="form-container">
      <h2>Cadastre-se</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="NomeCompleto">Nome Completo:</label>
          <input type="text" name="NomeCompleto" id="NomeCompleto" value={formData.NomeCompleto} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email:</label>
          <input type="email" name="Email" id="Email" value={formData.Email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Telefone">Telefone:</label>
          <input type="text" name="Telefone" id="Telefone" value={formData.Telefone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="DataNascimento">Data de Nascimento:</label>
          <input type="date" name="DataNascimento" id="DataNascimento" value={formData.DataNascimento} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Senha">Senha:</label>
          <input type="password" name="SenhaHash" id="SenhaHash" value={formData.SenhaHash} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input type="submit" value="Cadastrar" className="form-button" />
        </div>
      </form>
    </div>
  )
}

export default Cadastro
