const http = require('http');

function parsetime (time) {
    return {
        year: time.getFullYear(),
        month: time.getMonth(),
        date: time.getDate(),
        hour: time.getHours(),
      minute: time.getMinutes(),
      second: time.getSeconds()
    }
}

function unixtime (time) {
    return { unixtime : time.getTime() }
}

var server = http.createServer(function (req, res) {
    var time = new Date()
    var result
    
    // match req.url with the string /api/parse_currenttme
    if (/^\/api\/parse_currenttme/.test(req.url))
      // e.g., of time "2013-08-10T12:10:15.474Z"
      result = parsetime(time)
    // match req.url with the string /api/unix_currenttme
    else if (/^\/api\/unix_currenttme/.test(req.url))
      result = unixtime(time)
  
    if (result) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(result))
    } else {
      res.writeHead(404)
      res.end()
    }
});
server.listen(Number(process.argv[2]));


