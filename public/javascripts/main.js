bebidas();

document.querySelector('#form1').addEventListener('submit', function(e){
    e.preventDefault();
    let url = '/api/bebidasAlcoholicas';
    let data = {
        marca: document.forms['form1']['marca'].value,
        tipo: document.forms['form1']['tipo'].value,
        anios: document.forms['form1']['anios'].value
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(res=>{
        res.json();
    }).catch(err=>{
        console.log(err);
    }).then(res=>{
        bebidas();
    })
});

function bebidas(){
    var table = document.querySelector('#llenar');
    var contenido = '';
    fetch('/api/bebidasAlcoholicas', {
        method: 'GET'
    }).then(res=>{
        return res.text();
    }).catch(err=>{
        console.log(err);
    }).then(data=>{
        JSON.parse(data).bebidas.forEach(item=>{
            contenido = contenido + `<tr>
            <td>${item._id}</td>
            <td>${item.marca}</td>
            <td>${item.tipo}</td>
            <td>${item.anios}</td>
            <td>
                <a href="/api/bebidasAlcoholicas/${item._id}" class="eliminar btn btn-warning">Eliminar</a>
                <a href="/api/bebidasAlcoholicas/${item._id}" class="actualizar btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">Actualizar</a>
            </td>
            </tr>`
        });
        table.innerHTML=contenido;

        let eliminar = document.querySelectorAll('.eliminar');
        eliminar.forEach(item=>{
            item.addEventListener('click', function(e){
                e.preventDefault();
                let url = this['href'];
                fetch(url, {
                    method: 'DELETE'
                }).then(res=>{
                    res.json();
                }).catch(err=>{
                    console.log(err);
                }).then(res=>{
                    bebidas();
                })
            })
        })

        let actualizar = document.querySelectorAll('.actualizar');
        actualizar.forEach(item=>{
            item.addEventListener('click', function(e){
                e.preventDefault();
                let url = this['href'];
                fetch(url, {
                    method: 'GET'
                }).then(res=>{
                    return res.text();
                }).catch(err=>{
                    console.log(err);
                }).then(data=>{
                    let form = document.querySelector('#form2');
                    form.idBebida.value = JSON.parse(data)._id;
                    form.marca2.value = JSON.parse(data).marca;
                    form.tipo2.value = JSON.parse(data).tipo;
                    form.anios2.value = JSON.parse(data).anios;
                    //bebidas();
                })
            })
        });
    })
    
}

document.querySelector('#form2').addEventListener('submit', function(e){
    e.preventDefault();
    let url = '/api/bebidasAlcoholicas/'+document.forms['form2']['idBebida'].value;
    let data = {
        marca: document.forms['form2']['marca2'].value,
        tipo: document.forms['form2']['tipo2'].value,
        anios: document.forms['form2']['anios2'].value
    }
    console.log(url);
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(res=>{
        res.json();
    }).catch(err=>{
        console.log(err);
    }).then(res=>{
        bebidas();
    })
});