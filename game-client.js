var GameClient = function(divId) {

    function gridToTable(player,grid) {
        var theader = "";
        var tbody = "";

        theader = "<tr>"
        for (var i=0; i<grid[0].length; i++) {
            theader += '<td><img src="img/marker' + player + '.png" onclick="move(' + i + ')"/></td>';
        }
        theader += "</tr>";

        for (var i=0; i<grid.length; i++) {
            tbody += "<tr>"
            for (var j=0; j<grid[i].length; j++) {
                tbody += '<td><img src="img/marker' + grid[i][j] + '.png"/></td>';
            }
            tbody += "</tr>"
        }

        return "<table>" + theader + tbody + "</table>"
    }

    this.render = function(player,grid) {
        $("#" + divId).html(gridToTable(player,grid));
    }

}