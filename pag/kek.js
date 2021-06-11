//зволнение подвала первой страницы
function test()
{
    var lol = document.getElementsByTagName('h1')
}

//хаполнение шапки
function test_2()
{
  var list_h1 = document.getElementsByTagName('h1')
  var sod = ''
  var tmp_el
  var tmp_text
  for (var i = 0; i < list_h1.length; i++)
  {
    tmp_el = list_h1[i]
    tmp_text = tmp_el.innerText
    while (tmp_el.id.substr(0,5) != 'page-')
    {
      tmp_el = tmp_el.parentElement
    }
    sod += '<div class = "sod"><div style = "text-align: left;">' + tmp_text + '</div>' + 
    '<div style = "text-align: right;">' + tmp_el.id.substr(5) + '</div>' 
     + '</div>'
  }
  alert(sod)
}
