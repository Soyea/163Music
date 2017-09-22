var index = 0;
window.onload = function ()
{
    var div1 = document.getElementById('div1');
    var btns = div1.getElementsByTagName('input');
    var divs = div1.getElementsByTagName('div');
    for ( var i = 0; i < btns.length; i++)
    {
        btns[i].index = i;
        btns[i].onclick = function ()
        {
            divs[index].style.display = 'none';
            btns[index].className = '';
            this.className = 'active';
            divs[this.index].style.display = 'block';      
            index = this.index;
        }
    }
}



