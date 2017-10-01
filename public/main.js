var update = document.getElementById('update');


update.addEventListener('click', function(){
var txt = String(document.getElementById('pesquisa').value);

  fetch('quotes', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    'name': 'Sem Autor',
    'quote': 'Este comentario foi substituido!',
    'procura': txt
  })
})
.then(res => { if (res.ok) return res.json() })
.then(data => { console.log(data) })


})
