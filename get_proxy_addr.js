/*
 * This file is part of Free_Music.
 *
 * Free_Music is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Free_Music is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Free_Music.  If not, see <http://www.gnu.org/licenses/>.
 */

function httpGet(theUrl, callback)
{
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.onreadystatechange = function() {
    if(xmlHttp.readyState == 4)
    {
      if(xmlHttp.status == 200)
      {
        callback(xmlHttp.responseText);
      }else{
        //console.log('request cn-proxy failed:'+xmlHttp.status);
      }
    }

  }
  xmlHttp.send();
}

// function parseServerAddr(htmlText){
//   if(!htmlText){
//     console.log("request error");
//   }
//
//   var parser = document.createElement('items');
//   parser.innerHTML = htmlText;
//
//   //var second_div = parser.getElementsByTagName('div');
//   var ip_port = parser.getElementsByTagName('ip');
//
//   var server_list = [];
//   /*default server*/
//   // var server    = {};
//   // server.ip     = "122.96.59.105";
//   // server.port   = "81";
//   // server.speed  = 200;
//   // server_list.push(server);
//   for(var i=0;i<ip_port.length; i++){
//
//       var server    = {};
//       server.ip     = ip_port[i].childNodes[0].nodeValue.split(":")[0];
//       server.port   = ip_port[i].childNodes[0].nodeValue.split(":")[1];
//       server.speed  = parseInt(200);
//       server_list.push(server);
//
//   }
//
//   return server_list;
//   //console.log(server_info);
// }
//
//
// function getServerAddr(callback){
//   var url = "http://www.getproxy.jp/proxyapi?ApiKey=d562d5c771f458e116ed24e597351158c9695f5b&area=CN&sort=requesttime&orderby=asc";
//   httpGet(url, function(htmlText){
//     var server_list = parseServerAddr(htmlText);
//     callback(server_list);
//
//   });
// }

function parseServerAddr(htmlText){
  if(!htmlText){
    console.log("request error");
  }

  var parser = document.createElement('html');
  parser.innerHTML = htmlText;

  //var second_div = parser.getElementsByTagName('div');
  var second_div = parser.getElementsByClassName('table-container')[1];

  var server_table = second_div.getElementsByTagName('tbody')[0];
  //console.log(server_table);

  var server_list = [];
  /*default server*/
  // var server    = {};
  // server.ip     = "122.96.59.105";
  // server.port   = "81";
  // server.speed  = 200;
  // server_list.push(server);
  for(var i=0, row; row = server_table.rows[i]; i++){
    //for(var j = 0, col; col = row.cells[j]; j++){
      var ip        = row.cells[0];
      var port      = row.cells[1];
      var info      = row.cells[2]
      var speed_ele = row.cells[3];
      //var speed_parser = document.createElement('html');
      //speed_parser.innerHTML = speed_ele;
      //var speed_attr = speed_parser.getElementsByTagName('strong')[0];
      speed_ele = speed_ele.getElementsByTagName('strong')[0];
      var speed_attr = speed_ele.getAttribute('style');
      var speed_idx = speed_attr.indexOf(':');
      var percent_idx = speed_attr.indexOf('%');
      speed = speed_attr.substring(speed_idx+2, percent_idx);
      //console.log(speed);

      var server    = {};
      server.info   = info.innerText.split(' ')[0]
      server.ip     = ip.textContent;
      server.port   = port.textContent;
      server.speed  = parseInt(speed);
      server_list.push(server);
      //console.log("ip:"+ip.textContent+" port:"+port.textContent);
    //}
  }
  //for(var i=0; i < server_list.length; i++){
  //  console.log(server_list[i]);
  //}

  return server_list;
  //console.log(server_info);
}


function getServerAddr(callback){
  var url = "http://cn-proxy.com/";
  httpGet(url, function(htmlText){
    var server_list = parseServerAddr(htmlText);
    //
    // if(server_list.length >=2){
    //   if(server_list[0].speed < server_list[1].speed){
    //     //console.log(server_list[0].speed);
    //     //console.log(server_list[1].speed);
    //     var tmp = server_list[0];
    //     server_list[0] = server_list[1];
    //     server_list[1] = tmp;
    //     //console.log(server_list[0].speed);
    //     //console.log(server_list[1].speed);
    //
    //     //console.log('swap');
    //   }
    // }
    callback(server_list);
    //console.log(server_list[0]);
    //console.log(server_list[1]);

  });
}
