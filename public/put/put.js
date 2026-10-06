const btnBuscar = document.getElementById("btnBuscar");
const formAtualizar = document.getElementById("formAtualizar");

let idPessoa = null;
let cpfPessoa = null;

btnBuscar.addEventListener("click", async () => {
    const cpf = document.getElementById("cpfBusca").value;

    try {
        const resposta = await fetch(`/api/pessoas?cpf=${cpf}`);
        const pessoas = await resposta.json();

        if (pessoas.length === 0) {
            alert("Pessoa não encontrada.");
            formAtualizar.style.display = "none";
            return;
        }

        const pessoa = pessoas[0];

        idPessoa = pessoa.id;
        cpfPessoa = pessoa.cpf;

        document.getElementById("nome").value = pessoa.nome;
        document.getElementById("sobrenome").value = pessoa.sobrenome;
        document.getElementById("email").value = pessoa.email;
        document.getElementById("idade").value = pessoa.idade;
        document.getElementById("telefone").value = pessoa.telefone;
        document.getElementById("rua").value = pessoa.rua;
        document.getElementById("bairro").value = pessoa.bairro;
        document.getElementById("cidade").value = pessoa.cidade;
        document.getElementById("estado").value = pessoa.estado;
        document.getElementById("rg").value = pessoa.rg;

        formAtualizar.style.display = "block";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar pessoa.");
    }
});

formAtualizar.addEventListener("submit", async (event) => {
    event.preventDefault();

    const pessoaAtualizada = {
        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        cpf: cpfPessoa,
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
        const resposta = await fetch(`/api/pessoas/${idPessoa}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pessoaAtualizada)
        });

        if (resposta.ok) {
            alert("Pessoa atualizada com sucesso!");
        } else {
            alert("Erro ao atualizar pessoa.");
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com o servidor.");
    }
});
