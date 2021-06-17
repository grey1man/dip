window.onload = function () {
  document.getElementById('pas').setAttribute('value', localStorage.getItem('pas')) 
  document.getElementById('first_name').setAttribute('value', localStorage.getItem('first_name'))
  document.getElementById('second_name').setAttribute('value', localStorage.getItem('second_name'))
  document.getElementById('third_name').setAttribute('value', localStorage.getItem('third_name'))
  document.getElementById('scin_deg').setAttribute('value', localStorage.getItem('scin_deg'))
  document.getElementById('scin_dol').setAttribute('value', localStorage.getItem('scin_dol'))
  document.getElementById('dol').setAttribute('value', localStorage.getItem('dol')) 
  document.getElementById('phone_num').setAttribute('value', localStorage.getItem('phone_num'))
  document.getElementById('email').setAttribute('value', localStorage.getItem('email'))
} 

async function send() 
{ 
  var data = {log : localStorage.getItem('log'), 
  pas : document.getElementById('pas').value, first_name : document.getElementById('first_name').value, second_name : document.getElementById('second_name').value,
  third_name : document.getElementById('third_name').value, scin_deg : document.getElementById('scin_deg').value, scin_dol : document.getElementById('scin_dol').value,
  dol : document.getElementById('dol').value, phone_num : document.getElementById('phone_num').value, email : document.getElementById('email').value, change : 1}

  let response = await fetch('http://217.28.239.20:3000/reg', 
  {
    method : 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  })
  let commits = await response.json();

 
  if (commits.err == 1)
  {
    alert("некоторые поля не заполнены")
  } 
  else
  {
    localStorage.setItem('first_name', document.getElementById('first_name').value);
    localStorage.setItem('second_name', document.getElementById('second_name').value);
    localStorage.setItem('third_name', document.getElementById('third_name').value);
    localStorage.setItem('scin_deg', document.getElementById('scin_deg').value);
    localStorage.setItem('scin_dol', document.getElementById('scin_dol').value);
    localStorage.setItem('dol', document.getElementById('dol').value);
    localStorage.setItem('phone_num', document.getElementById('phone_num').value);
    localStorage.setItem('email', document.getElementById('email').value);
    alert("изменение данных прошло успешно")
  } 
}

