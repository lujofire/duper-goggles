
// Clase VotingTable
class VotingTable {
    constructor(code, idCoordinator, idVotingTable, registered, vote){
        this.code = code;
        this.idCoordinator = idCoordinator;
        this.idVotingTable = idVotingTable;
        this.registered = registered;
        this.vote = vote;
        
    }
}

// Interfaz con el Usuario (UI)
class UI{
    addVote(votingtable){
        const TableList = document.getElementById('table-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                <strong>Number Table</strong>: ${votingtable.code} -
                <strong>Code Coordinator</strong>: ${votingtable.idCoordinator} -
                <strong>Code VotingCenter</strong>: ${votingtable.idVotingTable} -
                <strong>Registered</strong>: ${votingtable.registered} -
                <strong>Votes</strong>: ${votingtable.vote}
                 <a href="#" class="btn btn-danger" name="delete">Delete</a>
                </div>
            </div>
        `;

        TableList.appendChild(element);
        this.resetForm();


    }
    deleteVote(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Date Deleted Successfully', 'info');
        }
    }
    showMessage(message,cssClass){
        // para crear el div que va a mostrar el mensaje
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //para mostrar en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);

    }
    resetForm(){
        document.getElementById('voting-form').reset();
    }
}

// Eventos del DOM
//Agregar Votos en el formulario
document.getElementById('voting-form').addEventListener('', function(e){
    const code = document.getElementById('code').value; // obtengo el valor del codigo por medio del id
    const idCoordinator = document.getElementById('idCoordinator').value;
    const idVotingTable = document.getElementById('idVotingTable').value;
    const registered = document.getElementById('registered').value;
    const vote = document.getElementById('vote').value;

    //crear un objeto VotingTable E Interfaz usuario
    const votingtable = new VotingTable(code, idCoordinator, idVotingTable, registered, vote);
    const ui = new UI();
    console.log(votingtable);
    // condicion para no enviar datos vacios al formulario
    if(code === '' || idCoordinator === '' || idVotingTable === '' || registered === '' || vote === ''){
        return ui.showMessage('Complete los campos porfavor', 'danger');
       
    }

    //envinado los datos a la clase UI 
    ui.addVote(votingtable);
    ui.showMessage('Datos agreados con exito', 'success');
    e.preventDefault();// esto evita que se refresque la pagina despues de hacer click en SAVE
});

//Eliminar un datos
document.getElementById('table-list').addEventListener('click', function(e){
    const ui2 = new UI();
    ui2.deleteVote(e.target);
     console.log(e.target);
 });
 