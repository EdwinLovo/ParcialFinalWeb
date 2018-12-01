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
    document.forms['form1']['marca'].value='';
    document.forms['form1']['tipo'].value='';
    document.forms['form1']['anios'].value='';
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
            <td><div>${item._id}</div></td>
            <td><div>${item.marca}</div></td>
            <td><div>${item.tipo}</div></td>
            <td><div>${item.anios}</div></td>
            <td>
                <a href="/api/bebidasAlcoholicas/${item._id}" class="eliminar btn btn-warning"><i class="fas fa-trash-alt"></i></a>
                <a href="/api/bebidasAlcoholicas/${item._id}" class="actualizar btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"><i class="far fa-edit"></i></a>
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
                    res.status(400).send(err);
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
        console.log(res);
        bebidas();
    })
});