const botao = document.getElementById("btnListar");
const lista = document.getElementById("listaPessoas");

botao.addEventListener("click", async () => {
    try {
        const resposta = await fetch("/api/pessoas");

        const pessoas = await resposta.json();

        lista.innerHTML = "";

        pessoas.forEach((pessoa) => {
            lista.innerHTML += `
                <p>
                    <strong>Nome:</strong> ${pessoa.nome} ${pessoa.sobrenome}<br>
                    <strong>CPF:</strong> ${pessoa.cpf}<br>
                    <strong>Email:</strong> ${pessoa.email}<br>
                    <strong>Idade:</strong> ${pessoa.idade}<br>
                    <strong>Telefone:</strong> ${pessoa.telefone}<br>
                    <strong>Cidade:</strong> ${pessoa.cidade}<br>
                    <strong>Estado:</strong> ${pessoa.estado}
                </p>
                <hr>
            `;
        });

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar pessoas.");
    }
});

const botaoBuscar = document.getElementById("btnBuscarCpf");
const resultadoBusca = document.getElementById("resultadoBusca");

botaoBuscar.addEventListener("click", async () => {
    const cpf = document.getElementById("cpfBusca").value;

    try {
        const resposta = await fetch(`/api/pessoas?cpf=${cpf}`);

        const pessoas = await resposta.json();

        resultadoBusca.innerHTML = "";

        if (pessoas.length === 0) {
            resultadoBusca.innerHTML = "<p>Pessoa não encontrada.</p>";
            return;
        }

        const pessoa = pessoas[0];

        resultadoBusca.innerHTML = `
            <p>
                <strong>Nome:</strong> ${pessoa.nome} ${pessoa.sobrenome}<br>
                <strong>CPF:</strong> ${pessoa.cpf}<br>
                <strong>Email:</strong> ${pessoa.email}<br>
                <strong>Idade:</strong> ${pessoa.idade}<br>
                <strong>Telefone:</strong> ${pessoa.telefone}<br>
                <strong>Rua:</strong> ${pessoa.rua}<br>
                <strong>Bairro:</strong> ${pessoa.bairro}<br>
                <strong>Cidade:</strong> ${pessoa.cidade}<br>
                <strong>Estado:</strong> ${pessoa.estado}<br>
                <strong>RG:</strong> ${pessoa.rg}
            </p>
        `;

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar CPF.");
    }
});
