/*EXPANDIR MENU LATERAL*/
document.getElementById('open_btn').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open-sidebar');
});



/*EXPANDIR MENU PERFIL*/
document.getElementById('open_btn-perfil').addEventListener('click', function () {
    document.getElementById('sidebar_perfil').classList.toggle('open-sidebar_perfil');
});





/*expandir menu*/
document.getElementById('btn-expandir').addEventListener('click', function(){
    document.getElementById('menu-lateral').classList.toogle('menu-lateral')
})















/*Modal Instrução*/
const button = document.querySelector("button")
const modal = document.querySelector("dialog")
const buttonClose = document.querySelector("dialog button")

button.onclick=function(){
    modal.showModal()
}

buttonClose.onclick = function(){
    modal.close()
}











