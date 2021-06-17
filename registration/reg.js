async function send() 
{ 
  var data = {log : document.getElementById('log').value, 
  pas : document.getElementById('pas').value, first_name : document.getElementById('first_name').value, second_name : document.getElementById('second_name').value,
  third_name : document.getElementById('third_name').value, scin_deg : document.getElementById('scin_deg').value, scin_dol : document.getElementById('scin_dol').value,
  dol : document.getElementById('dol').value, phone_num : document.getElementById('phone_num').value, email : document.getElementById('email').value}

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
    alert("некоторые поля не заполнены или пользователь с таким логином уже существует")
  } 
  else
  {
    alert("регистрация завершена успешно")
  } 
  
}

