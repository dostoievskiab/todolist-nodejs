var update = document.getElementById('update');
var del = document.getElementById('delete');

update.addEventListener('click', function(){
var txtUpdate = String(document.getElementById('pesquisa').value);

  fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Sem Autor',
    'quote': 'Este comentario foi substituido!',
    'procura': txtUpdate
  })
})
.then(res => { if (res.ok) return res.json() })
.then(data => { console.log(data) })
})

del.addEventListener('click', function(){
  var txtPesq = String(document.getElementById('pesDel').value);

  fetch('quotes', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': txtPesq
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    //window.location.reload()
  })
})
