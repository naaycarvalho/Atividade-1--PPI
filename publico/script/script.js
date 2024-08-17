document.addEventListener('DOMContentLoaded', function() {
    const QuantidadeInput = document.getElementById('Quantidade');
    const valorElement = document.getElementById('valor');
    const valortotalElement = document.getElementById('valortotal');

    const preçoingresso = parseFloat(valorElement.textContent); 

    function mostrarTotal() {
        const Quantidade = parseInt(QuantidadeInput.value, 10);
        const valortotal = Quantidade * preçoingresso;
        valortotalElement.textContent = valortotal.toFixed(2);
    }

    QuantidadeInput.addEventListener('input', mostrarTotal);

    mostrarTotal();
});