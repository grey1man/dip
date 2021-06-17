async function auth() 
{ 
  var data = {log : document.getElementById('log').value, 
  pas : document.getElementById('pas').value}

  let response = await fetch('http://217.28.239.20:3000/auth', 
  {
    method : 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(data)
  })
  let commits = await response.json();

  if (commits.log_in != 1)
  {
    alert("ошибка авторизации")
  }  
  else 
  {
    localStorage.setItem('log_in', commits.log_in);
    localStorage.setItem('first_name', commits.first_name);
    localStorage.setItem('second_name', commits.second_name);
    localStorage.setItem('third_name', commits.third_name);
    localStorage.setItem('scin_deg', commits.scin_deg);
    localStorage.setItem('scin_dol', commits.scin_dol);
    localStorage.setItem('dol', commits.dol);
    localStorage.setItem('pas', commits.pas);
    localStorage.setItem('log', commits.log);
    localStorage.setItem('phone_num', commits.phone_num);
    localStorage.setItem('email', commits.email);
    window.location.href = "http://217.28.239.20:3000/wp?log_in=1";
  }
  
}

function red()
{
  window.location.href = "http://217.28.239.20:3000/registration";
}