//EXPANDIR MENU LATERAL//
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});
















/*Modal Instrução
const button = document.querySelector("button");
const modal = document.querySelector("dialog");
const buttonClose = document.querySelector("dialog button");

 onclick=function(){
    modal.showModal()
}

buttonClose.onclick = function(){
    modal.close()

}*/


























//status da solicitação de BH//
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('timeRequestForm');
    const requestsTableBody = document.getElementById('requestsTableBody');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const startDateTime = document.getElementById('startDateTime').value;
        const endDateTime = document.getElementById('endDateTime').value;

        if (new Date(startDateTime) >= new Date(endDateTime)) {
            alert('A data e hora inicial deve ser anterior à data e hora final.');
            return;
        }


        
        const newRow = document.createElement('tr');

        const startDateTimeCell = document.createElement('td');
        startDateTimeCell.textContent = startDateTime;
        newRow.appendChild(startDateTimeCell);

        const endDateTimeCell = document.createElement('td');
        endDateTimeCell.textContent = endDateTime;
        newRow.appendChild(endDateTimeCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = 'Em análise';
        newRow.appendChild(statusCell);

        requestsTableBody.appendChild(newRow);

        form.reset();
    });
});








/*document.getElementById('mostrarFormBtn').addEventListener('click', function() {
    document.getElementById('formulario').style.display = 'block';
});*/







