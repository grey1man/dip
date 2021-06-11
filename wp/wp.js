var oDoc, sDefTxt, txtboxfill;
var formNumber = 0;
var week_number = 1;
var comp = ['УК-5', 'УК-6', 'УК-7']
var control = ["Kp","K","P"]
var titul_top = 0
var titul_bottom
var toc_flag = 0

window.onload = function(){
  if (localStorage.getItem('week_number') != null)
  {
    load()
    /*
    document.getElementById('body').innerHTML = localStorage.getItem('body')
    formNumber = localStorage.getItem('formNumber')
    week_number = localStorage.getItem('week_number')
    */
  }
  document.getElementById("form_" + formNumber).hidden = false;
}

function check(word, list)
{
  for (var i = 0; i < list.length; i++)
  {
    if (word == list[i])
    {
      return true
    }
  }
  return false

}

function initDoc() {
  oDoc = document.getElementsByClassName("textBox");
  sDefTxt = oDoc.innerHTML;
  if (document.compForm.switchBox.checked) { setDocMode(true); }
}

function formatDoc(id_box, sCmd, sValue) {
  oDoc = document.getElementById(id_box)
  if (validateMode()) { document.execCommand(sCmd, false, sValue); oDoc.focus(); }
} 

function validateMode() {
  oDoc.focus();
  return true;
}

function setDocMode(bToSource) {
  var oContent;
  if (bToSource) {
    oContent = document.createTextNode(oDoc.innerHTML);
    oDoc.innerHTML = "";
    var oPre = document.createElement("pre");
    oDoc.contentEditable = false;
    oPre.id = "sourceText";
    oPre.contentEditable = true;
    oPre.appendChild(oContent);
    oDoc.appendChild(oPre);
    document.execCommand("defaultParagraphSeparator", false, "div");
  } else {
    if (document.all) {
      oDoc.innerHTML = oDoc.innerText;
    } else {
      oContent = document.createRange();
      oContent.selectNodeContents(oDoc.firstChild);
      oDoc.innerHTML = oContent.toString();
    }
    oDoc.contentEditable = true;
  }
  oDoc.focus();
}

function printDoc() {
  if (!validateMode()) { return; }
  var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
  oPrntWin.document.open(); 
  oPrntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + oDoc.innerHTML + "<\/body><\/html>");
  oPrntWin.document.close(); /*  */ 
}



function forward()
{
  if (formNumber == 0)
  {
    ask_hours();
  }
  document.getElementById("form_" + formNumber).hidden = true;
  formNumber += 1
  document.getElementById("form_" + formNumber).hidden = false;
}

async function ask_hours()
{
  let data = {first_name : localStorage.getItem('first_name'),
    second_name : localStorage.getItem('second_name'),
    third_name : localStorage.getItem('third_name'),
    institute : document.getElementById('institute').value,
    discipline : document.getElementById('name_disc').innerText,
    course : document.getElementById('cours').value,
    dir_prep : document.getElementById('direction_prep').innerText,
    qualification : document.getElementById('qualifications').value,
    form_ed : document.getElementById('form_education').value}

    let response = await fetch('http://localhost:3000/hours', 
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
      alert('Неправильно заполнена первая страница, либо данных о этой дисциплине не существует, часы выставлены не будут')
    }
    else
    {
      document.getElementById('hours_lec').innerText = commits.lections
      document.getElementById('hours_prac').innerText = commits.practise
      document.getElementById('hours_lab').innerText = commits.labs
      document.getElementById('hours_srs').innerText = commits.srs
    }
}

function backward()
{
  document.getElementById("form_" + formNumber).hidden = true;
  formNumber -= 1
  document.getElementById("form_" + formNumber).hidden = false;
}

function move_to(block_number, quantity, form)
{
  for (var i = 0; i < quantity; i++ )
  {
    document.getElementById("block_" + form + i).hidden = true;
  }
  document.getElementById("block_" + form + block_number).hidden = false;
}

function new_datalist()
{
  var parent = document.getElementById("block_form_2_2")
  var elem = document.createElement('div')
  elem.innerHTML = '<input list="competetion" onkeypress="new_datalist()">'
  parent.appendChild(elem)
  for (var i = 2; i < parent.childElementCount - 1; i++)
  {
    var test1 = parent.children[i]
    var test2 = parent.children[i].children[0]
    parent.children[i].children[0].onkeypress = false;
  }
}

function new_week()
{
  week_number++
  var parent = document.getElementById("row_1")
  var elem = document.createElement('th')
  elem.innerHTML = '<div><input list="control" size="5" onkeypress="new_week()"></div>'
  parent.appendChild(elem)
  parent = document.getElementById("row_0")
  elem = document.createElement('th')
  elem.innerHTML = week_number
  parent.appendChild(elem)
  parent = document.getElementById("row_1")
  for (var i = 1; i < parent.childElementCount - 1; i++)
  {
    parent.children[i].children[0].children[0].onkeypress = false
  }
}

function TeX_render()
{
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function new_row(val)
{
  parent = document.getElementById("table_srs")
  elem = document.createElement('tr')
  elem.innerHTML = '<tr> \
  <td > <input type="text" size="10"> </td> \
  <td>  <input size="10" list="themes" onchange="new_row(this)" contenteditable="true"> </td> \
  <td> <input type="text" size="10"> </td> \
  <td> <input type="text" size="10"> </td> \
  <td> <input type="text" size="10"> </td> \
  <td> <input type="text" size="10"> </td> \
</tr>'
  //бред сивой кобылы
  //document.getElementById('themes').innerHTML += '<option value="УК-5"></option>'
  reference = document.getElementById("total")
  parent.insertBefore(elem, reference)
  for (var i = 3; i < parent.childElementCount - 3; i++)
  {
    var test = parent.children[i].children[1].children[0]
    parent.children[i].children[1].children[0].onkeypress = false
  }
  parent = document.getElementById('themes')
  elem = document.createElement('option')
  elem.setAttribute('value', val.value)
  parent.appendChild(elem)
}

/*
function save()
{
  localStorage.setItem('formNumber', formNumber)
  localStorage.setItem('week_number', week_number)
  localStorage.setItem('body',document.getElementById('body').innerHTML)
}
*/

function save()
{
  //снйвим все с первой формы
  //localStorage.setItem('formNumber', Number(formNumber))
  localStorage.setItem('name_disc', document.getElementById('name_disc').innerHTML)
  localStorage.setItem('direction_prep', document.getElementById('direction_prep').innerHTML)
  localStorage.setItem('direction_profile', document.getElementById('direction_profile').innerHTML)
  localStorage.setItem('institute', document.getElementById('institute').value)
  localStorage.setItem('cours', document.getElementById('cours').value)
  localStorage.setItem('qualifications', document.getElementById('qualifications').value)
  localStorage.setItem('form_education', document.getElementById('form_education').value)
  //сейвим со второй
  localStorage.setItem('aim', document.getElementById('aim').innerHTML)
  localStorage.setItem('problems', document.getElementById('problems').innerHTML)
  localStorage.setItem('results', document.getElementById('results').innerHTML)
  //сейвим с третьей
  localStorage.setItem('lections', document.getElementById('lections').innerHTML)
  localStorage.setItem('practise', document.getElementById('practise').innerHTML)
  var comp_values = []
  var parent = document.getElementById('block_form_2_2')
  for (var i = 2; i < parent.childElementCount - 1; i++)
  {
    comp_values.push(parent.children[i].children[0].value)
  }
  localStorage.setItem('comp_values', JSON.stringify(comp_values))
  //сейвим с четвертой
  localStorage.setItem('structure_srs', document.getElementById('structure_srs').innerHTML)
  localStorage.setItem('content_srs', document.getElementById('content_srs').innerHTML)
  localStorage.setItem('week_number', week_number)
  var cont_values = []
  parent = document.getElementById('row_1')
  //изменил тут
  for (var i = 1; i < parent.childElementCount; i++)
  {
    cont_values.push(parent.children[i].children[0].children[0].value)
  }
  localStorage.setItem('cont_values', JSON.stringify(cont_values))
  localStorage.setItem('semester', document.getElementById('semester').innerHTML)
  localStorage.setItem('prom_att', document.getElementById('prom_att').innerHTML)
  parent = document.getElementById('table_srs')
  var table_srs_values = []
  var rows = []
  for (var i = 3; i < parent.childElementCount - 3; i++)
  {
    //parent.children[i].childElementCount
    for (var j = 0; j < 6; j++ )
      rows.push(parent.children[i].children[j].children[0].value)
    table_srs_values.push(rows)
    rows = []
  }
  
  
  localStorage.setItem('table_srs_values',  JSON.stringify(table_srs_values))
}

function load()
{
  //заполняем первую форму
  //formNumber = Number(localStorage.getItem('formNumber'))
  
  document.getElementById('name_disc').innerHTML = localStorage.getItem('name_disc')
  document.getElementById('direction_prep').innerHTML = localStorage.getItem('direction_prep')
  document.getElementById('direction_profile').innerHTML = localStorage.getItem('direction_profile')
  document.getElementById('institute').value = localStorage.getItem('institute')
  document.getElementById('cours').value = localStorage.getItem('cours')
  document.getElementById('qualifications').value = localStorage.getItem('qualifications')
  document.getElementById('form_education').value = localStorage.getItem('form_education')
  //заполняем вторую
  document.getElementById('aim').innerHTML = localStorage.getItem('aim')
  document.getElementById('problems').innerHTML = localStorage.getItem('problems')
  document.getElementById('results').innerHTML = localStorage.getItem('results')
  //заполняем третью
  document.getElementById('lections').innerHTML = localStorage.getItem('lections')
  document.getElementById('practise').innerHTML = localStorage.getItem('practise')
  var comp_values = JSON.parse(localStorage.getItem("comp_values"));
  var parent = document.getElementById('block_form_2_2')
  for (var i = 0; i < comp_values.length; i++)
  {
    parent.children[i + 2].children[0].value = comp_values[i]
    new_datalist()
  }
  //заполняем четвертую
  document.getElementById('structure_srs').innerHTML = localStorage.getItem('structure_srs')
  document.getElementById('content_srs').innerHTML = localStorage.getItem('content_srs')
  //week_number = localStorage.getItem('week_number')
  var cont_values = JSON.parse(localStorage.getItem("cont_values"));
  parent = document.getElementById('row_1')
  for (var i = 1; i < cont_values.length; i++)
  {
    parent.children[i].children[0].children[0].value = cont_values[i - 1]
    new_week()
  }
  document.getElementById('semester').innerHTML = localStorage.getItem('semester')
  document.getElementById('prom_att').innerHTML = localStorage.getItem('prom_att')
  parent = document.getElementById('table_srs')
  var table_srs_values = JSON.parse(localStorage.getItem('table_srs_values'));
  for (var i = 3; i < table_srs_values.length + 3; i++)
  {
    for (var j = 0; j < 6; j++ )
      parent.children[i].children[j].children[0].value = table_srs_values[i - 3][j]
    new_row()
  }
  
}


function validation()
{
  //очевидно ничерта не работает
  var errors = ''
  var lol = document.getElementById("name_disc")
  if (document.getElementById("name_disc").innerHTML == '')
  {
    errors += 'не заполнено название подготовки \n'
  }
  if (document.getElementById("direction_prep").innerHTML == '')
  {
    errors += 'не заполнено направление подготовки \n'
  }
  if (document.getElementById("direction_profile").innerHTML == '')
  {
    errors += 'не заполнено направленность подготовки \n'
  }
  if (document.getElementById('content_srs').innerHTML == '')
  {
    errors += 'не заполнено содержание срс \n'
  }
  if (document.getElementById('structure_srs').innerHTML == '')
  {
    errors += 'не заполнено структура срс \n'
  }
  if (document.getElementById('practise').innerHTML == '')
  {
    errors += 'не заполнено практика \n'
  }
  if (document.getElementById('lections').innerHTML == '')
  {
    errors += 'не заполнено лекции \n'
  }
  if (document.getElementById('results').innerHTML == '')
  {
    errors += 'не заполнено результаты освоения \n'
  }
  if (document.getElementById('problems').innerHTML == '')
  {
    errors += 'не заполнено задачи освоения \n'
  }
  if (document.getElementById('aim').innerHTML == '')
  {
    errors += 'не заполнено цели \n'
  }
  parent = document.getElementById('block_form_2_2')
  if (1 == parent.childElementCount - 1)
  {
    errors += 'не заполнены компетенции \n'
  }
  for (var i = 2; i < parent.childElementCount - 1; i++)
  {
    if (!(check(parent.children[i].children[0].value, comp)))
    {
      errors += 'не правильно заполнены компетенции \n'
      break
    }
    if (i == parent.childElementCount - 1)
    {
      errors += 'не заполнена таблица срс \n'
    }
  }
  parent = document.getElementById('row_1')
  if (1 == parent.childElementCount - 1)
  {
    errors += "не заполнена таблица контроль \n"
  }
  for (var i = 1; i < parent.childElementCount - 1; i++)
  {
    var test = parent.children[i].children[0].children[0].value
    if (!(check(test, control)))
    {
      errors += 'не правильно заполнена таблица контроль \n'
      break
    }
  }
  parent = document.getElementById('table_srs')
  if (3 == parent.childElementCount - 3)
  {
    errors += "не структура заполнена таблица СРС \n"
  }
  for (var i = 3; i < parent.childElementCount - 3; i++)
  {
    if ((parent.children[i].children[0].innerHTML == null) || (parent.children[i].children[1].innerHTML == null))
    {
      errors += 'не правильно заполнена таблица срс \n'
      break
    }
    if (i == parent.childElementCount - 3)
    {
      errors += 'не заполнена таблица срс \n'
    }
  }

  //добавить валидашку о сумме часов
  alert(errors)
  if (errors != '')
  {
    return false
  }
  else 
  {
    return true
  }
}

function requesting()
{
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        //потом сделаем так чтобы вкидывало куда и что надо
        document.getElementById("txtHint").innerHTML = this.responseText;
    }
  };
  xmlhttp.open("POST","//localshost:3000",true);
  xmlhttp.send();
}

function delete_col_cont()
{
  if (document.getElementById('row_1').childElementCount > 2)
  {
    document.getElementById('row_1').lastChild.remove()
    document.getElementById('row_1').lastChild.setAttribute('onkeypress', 'new_week();')
    document.getElementById('row_0').lastChild.remove()
    week_number -= 1
  }
}

function delete_comp_row()
{
  if (document.getElementById('block_form_2_2').childElementCount > 3)
  {
    document.getElementById('block_form_2_2').lastChild.remove()
    if (document.getElementById('block_form_2_2').childElementCount <= 3)
    {
      var test = document.getElementById('block_form_2_2').children[document.getElementById('block_form_2_2').childElementCount - 1].children[0]
      test.setAttribute('onkeypress', 'new_datalist()')
    }
    var test = document.getElementById('block_form_2_2').lastChild.children[0]
    test.setAttribute('onkeypress', 'new_datalist()')
  }
  
}

function delete_table_srs()
{
  parent = document.getElementById('table_srs')
  if (parent.childElementCount > 6)
  {
    parent.children[parent.childElementCount - 3].remove()
    parent.children[parent.childElementCount - 3].children[1].onkeypress = 'new_row()'
    parent.children[parent.childElementCount - 3].children[1].setAttribute('onkeypress','new_row()')
  }
}

function preview()
{
  save()
  toc_flag = 0
  localStorage.setItem('bef_prev' , document.getElementById('body').innerHTML)
  titul_top = `<div class = "titul_top"><font size="3">Министерство образования и науки Российской федерации <p></p>
  ФГБОУ ВО "Удмуртский государственный универститет <p></p>" ` + document.getElementById('institute').value + '</font></div>'
  
  let titul_middle = '<div id = "mark" style="text-align: center;"><p></p><font size="5"> <b>Рабочая программа дисциплины :</b> <p></p>' + document.getElementById('name_disc').innerText + 
   '<p></p><b> Направление подготовки : </b> <p></p>' + document.getElementById('direction_prep').innerText + '<p></p> <b>Квалификация выпускника : </b><p></p>' + 
   document.getElementById('qualifications').value + '<p></p><b> Форма обучения : </b><p></p>' + document.getElementById('form_education').value 
   + '</font></div>'

  titul_bottom = '<font size="3"><div style="text-align: center;">Ижевск 2021</font></div>'
  
  let form_1 = "<div>" + localStorage.getItem('aim') + localStorage.getItem('problems') + localStorage.getItem('results') + "</div>"

  var comp_values = JSON.parse(localStorage.getItem("comp_values"));
  let comp = '<div> Компетенции : <p></p>'
  for (let i = 0; i < comp_values.length; i++)
  {
    comp += comp_values[i] + '<p></p>';
  }
  comp += '</div> <p></p>'

  let form_2 = localStorage.getItem('lections') + localStorage.getItem('practise') + comp

  var test = document.getElementById('block_form_3_3').innerHTML

  document.getElementById('del_row').setAttribute('hidden', 'true')
  document.getElementById('add_row').setAttribute('hidden', 'true')
  document.getElementById('del_col').setAttribute('hidden', 'true')
  document.getElementById('add_col').setAttribute('hidden', 'true')

  let form_3 = localStorage.getItem('structure_srs') + '<p></p><div id="mark3">' +
  `
  <div>Разработчик рабочей программы</div>
  <table class="iksweb">
	<tbody>
		<tr>
			<td size = '10'>ФИО</td>
			<td size = '10'>Ученая степень</td>
			<td size = '10'>Учениое звание</td>
			<td size = '10'>Должность</td>
			<td size = '10'>Контактная информация</td>
		</tr>
		<tr>
			<td size = '10'>` + localStorage.getItem('first_name') + ' ' + localStorage.getItem('second_name')  + ' ' + localStorage.getItem('third_name')  +  `</td>
			<td size = '10'>` + localStorage.getItem('scin_deg') +`</td>
			<td size = '10'>` + localStorage.getItem('scin_dol') + `</td>
			<td size = '10'>` + localStorage.getItem('dol') + `</td>
			<td size = '10'>` + localStorage.getItem('phone_num') + ' ' + localStorage.getItem('email') + `</td>
		</tr>
	</tbody>
</table> 
<div id = 'mark5'></div>
`
  +  document.getElementById('block_form_3_1').innerHTML + '</div><p></p>' + localStorage.getItem('content_srs') +
  '<div id="mark4"></div><div><div>Структура СРС в таблице</div><p></p>' + document.getElementById('block_form_3_3').innerHTML + '</div>'

  let bod = document.getElementById('body')
  bod.removeChild(document.getElementById('form_0'))
  bod.removeChild(document.getElementById('form_1'))
  bod.removeChild(document.getElementById('form_2'))
  bod.removeChild(document.getElementById('form_3'))

  bod.innerHTML = titul_middle + '<div id = "mark2"></div>' + form_1 + form_2 + form_3

  let pag = document.createElement("script")
  pag.setAttribute('src', "https://unpkg.com/pagedjs/dist/paged.polyfill.js")
  document.getElementById('head').insertBefore(pag, document.getElementById('fs'))

  //шапка
  titul()


}

function titul()
{
  var elem = document.getElementById('page-1')
    elem = elem.children[0]
    elem = elem.children[4]
    elem = elem.children[1]
    elem = elem.children[1]
    elem = elem.children[0].innerHTML = titul_top

  //подвал
  var elem = document.getElementById('page-1')
    elem = elem.children[0]
    elem = elem.children[4]
    elem = elem.children[6]
    elem = elem.children[1]
    elem = elem.children[0].innerHTML = titul_bottom
  
  if (document.getElementById('mark2').innerHTML === "")
  {
    document.getElementById('mark2').innerHTML = toc()
  }
}

function toc()
{
  var list_h1 = document.getElementsByTagName('h1')
  var tmp_el
  var tmp_text
  var sod = '<div style = "text-align : center"><font size = "5">Содержание</font></div>'
  for (var i = 0; i < list_h1.length; i++)
  {
    tmp_el = list_h1[i]
    tmp_text = tmp_el.innerText
    while (tmp_el.id.substr(0,5) != 'page-')
    {
      tmp_el = tmp_el.parentElement
    }

    //sod += '<div class = "sod"><div style = "text-align: left; ">' + tmp_text + '</div>' + 
    //'<div style = "text-align: right; ">' + tmp_el.id.substr(5) + '</div>' 
     //+ '</div>'

    sod += `<div class="tableofcontents">
            <div class="line">
            <div class="name">` + tmp_text + `</div>
            <div class="page_num">` + tmp_el.id.substr(5) + `</div>
            <div class="clear"></div>
            </div>`
    
  }
  toc_flag = 1
  return sod
}

setInterval(save, 30000);

//костыль, но иначе никак, наверное
setInterval(titul, 100);

/*
function weeks()
{

}
*/







