const btnBuscar = document.getElementById("btnBuscar");
const btnExcluir = document.getElementById("btnExcluir");
const resultado = document.getElementById("resultado");

let idPessoa = null;

btnBuscar.addEventListener("click", async () => {
    const cpf = document.getElementById("cpfBusca").value;

    try {
        const resposta = await fetch(`/api/pessoas?cpf=${cpf}`);

        const pessoas = await resposta.json();

        if (pessoas.length === 0) {
            resultado.innerHTML = "<p>Pessoa não encontrada.</p>";
            btnExcluir.style.display = "none";
            return;
        }

        const pessoa = pessoas[0];

        idPessoa = pessoa.id;

        resultado.innerHTML = `
            <p>
                <strong>Nome:</strong> ${pessoa.nome} ${pessoa.sobrenome}<br>
                <strong>CPF:</strong> ${pessoa.cpf}<br>
                <strong>Email:</strong> ${pessoa.email}
            </p>
        `;

        btnExcluir.style.display = "block";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar pessoa.");
    }
});

btnExcluir.addEventListener("click", async () => {
    try {
        const resposta = await fetch(`/api/pessoas/${idPessoa}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            alert("Pessoa excluída com sucesso!");

            resultado.innerHTML = "";
            btnExcluir.style.display = "none";

            document.getElementById("cpfBusca").value = "";
        } else {
            alert("Erro ao excluir pessoa.");
        }

    } catch (erro) {
        console.error(erro);
        alert("Erro ao conectar com o servidor.");
    }
});
