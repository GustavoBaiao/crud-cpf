const form = document.getElementById("formCadastro");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const pessoa = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        idade: document.getElementById("idade").value,
        telefone: document.getElementById("telefone").value,
        rua: document.getElementById("rua").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        rg: document.getElementById("rg").value
    };

    try {
        const resposta = await fetch("/api/pessoas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pessoa)
        });

        if (resposta.ok) {
            alert("Pessoa cadastrada com sucesso!");
            form.reset();
        } else {
            alert("Erro ao cadastrar pessoa.");
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com o servidor.");
    }
});
