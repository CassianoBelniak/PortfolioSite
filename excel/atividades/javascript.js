var answerTable = [];

function addAnswer(ans){
  answerTable.push(ans);
}


var mydragg = function(){
                return {
                    move : function(divid,xpos,ypos){
                        divid.style.left = xpos + 'px';
                        divid.style.top = ypos + 'px';
                    },
                    startMoving : function(divid,container,evt){
                        evt = evt || window.event;
                        var posX = evt.clientX,
                            posY = evt.clientY,
                        divTop = divid.style.top,
                        divLeft = divid.style.left,
                        eWi = parseInt(divid.style.width),
                        eHe = parseInt(divid.style.height),
                        cWi = parseInt(document.getElementById(container).style.width),
                        cHe = parseInt(document.getElementById(container).style.height);
                        document.getElementById(container).style.cursor='move';
                        divTop = divTop.replace('px','');
                        divLeft = divLeft.replace('px','');
                        var diffX = posX - divLeft,
                            diffY = posY - divTop;
                        document.onmousemove = function(evt){
                            evt = evt || window.event;
                            var posX = evt.clientX,
                                posY = evt.clientY,
                                aX = posX - diffX,
                                aY = posY - diffY;
                                if (aX < 0) aX = 0;
                                if (aY < 0) aY = 0;
                                if (aX + eWi > cWi) aX = cWi - eWi;
                                if (aY + eHe > cHe) aY = cHe -eHe;
                            mydragg.move(divid,aX,aY);
                        }
                    },
                    stopMoving : function(container){
                        var a = document.createElement('script');
                        document.getElementById(container).style.cursor='default';
                        document.onmousemove = function(){}
                    },
                }
            }();



            var excelTable = []

            function initTable(col,lin){
              for (var i = 0; i < lin; i++) {
                excelTable[i] = []
                for (var j = 0; j < col; j++) {
                  excelTable[i][j] = 0;
                }

              }
            }

            function addTable(col,lin,val){
              excelTable[lin][col] = val;
            }

            function drawTable(id){
              var object = document.getElementById(id);
              var str = "";

              str += "<table class='excel-table'>";
              str += "<th>";str += "</th>"
              for (var i = 0; i < excelTable[0].length; i++) {
                str += "<th>";
                str += alfabeto(i);
                str += "</th>"
              }

              for (var i = 0; i < excelTable.length; i++) {
                str += "<tr>";
                str += "<th>" + (i+1) + "</th>";
                for (var j = 0; j < excelTable[i].length; j++) {
                  str += "<td class='td-clean' id='"+ alfabeto(j) + (i+1) +"'>";

                  if (excelTable[i][j] != 0)
                    str += excelTable[i][j];
                  str += "</td>";
                }
                str += "</tr>";
              }
              str += "</table>";
              object.innerHTML = str;
            }

            function alfabeto(num) {
              alf = ["A",'B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',"U",'V','W','X','Y','Z'];
              return alf[num];
            }


function testEquation() {
  var text = document.getElementById('form-test').value;

  text = text.toUpperCase();
  var yep = false;
  for (var i = 0; i < answerTable.length; i++) {
    if (answerTable[i] == text)
      yep = true;
  }

  if (yep)
    document.getElementById('form-test').style.borderColor = "#00e676";
  else
    document.getElementById('form-test').style.borderColor = "#f44336";

  var camps = [];
  var j;
  for (var i = 0; i < text.length; i++) {
    if (isLetter(text.charAt(i))){
      j = i;
      while (isLetter(text.charAt(i)) ||  isNumber(text.charAt(i))) {
        i++;
      }
      camps.push(text.slice(j,i));
    }
  }


  var list = document.getElementsByClassName('td-clean');
  for (var i = 0; i < list.length; i++) {
    list[i].style.backgroundColor = "#FFF";
  }



  for (var i = 0; i < camps.length; i++) {
    var tt = document.getElementById(camps[i]);
    if (tt)
    tt.style.backgroundColor = "#66bb6a";
  }

}




function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function isNumber(str) {
  return str.length === 1 && str.match(/[0-9]/i);
}
