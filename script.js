document
  .getElementById("cadastroForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 

    const formData = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      genero: document.querySelector('input[name="genero"]:checked') ? document.querySelector('input[name="genero"]:checked').value : null,
      pais: document.getElementById("pais").value,
      carroInteresse: document.getElementById("carro-interesse").value,
      anoCarro: document.getElementById("ano-carro").value,
    };

    console.log("Dados:", formData);

    fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro na resposta do servidor: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        alert("Cadastro realizado com sucesso!");

        document.getElementById('nome').value = ""; 
        document.getElementById('email').value = ""; 
        document.getElementById('telefone').value = ""; 
        const generoInputs = document.querySelectorAll('input[name="genero"]');
        generoInputs.forEach(input => input.checked = false);
        document.getElementById('pais').selectedIndex = 0; 
        document.getElementById('carro-interesse').selectedIndex = 0; 
        document.getElementById('ano-carro').value = ""; 
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ocorreu um erro ao realizar o cadastro: " + error.message);
      });
  });

