//EXPANDIR MENU LATERAL//
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});




// EXPANDIR MENU PERFIL
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('open_btn2').addEventListener('click', function() {
        document.getElementById('sidebar_perfil').classList.toggle('open-sidebar_perfil');
    });
});




//expandir menu//
document.getElementById('btn-expandir').addEventListener('click', function(){
    document.getElementById('menu-lateral').classList.toogle('menu-lateral')
})



//Modal Instrução//
const button = document.querySelector("button");
const modal = document.querySelector("dialog");
const buttonClose = document.querySelector("dialog button");

 onclick=function(){
    modal.showModal()
}

buttonClose.onclick = function(){
    modal.close()
}





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







