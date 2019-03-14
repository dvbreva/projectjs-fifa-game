
var getInfoByGroups = () => {

    AjaxWrapper.get("http://worldcup.sfg.io/teams/group_results", (data) => {
       
    var groups = data;
    var table = document.getElementById("groupsTable");
    
    // to make sure that countless clicking on the show info button won't show consecutive tables
    document.getElementById("groupsTable").innerHTML = "";

        for (var i = 0; i < groups.length; i++) {
            var tr = table.appendChild(document.createElement("tr"));
    
            var td = tr.appendChild(document.createElement("td"));
    
            td.appendChild(document.createTextNode("Group " + groups[i].id));
            var newLine = document.createElement("p");
            newLine.innerHTML=groups[i].letter;
            td.appendChild(newLine);
    
            for (var j = 0; j < groups[i].ordered_teams.length; j++) {
                var ul = td.appendChild(document.createElement("ul"));
                var li = ul.appendChild(document.createElement("li"));
                li.appendChild(document.createTextNode(groups[i].ordered_teams[j].fifa_code + " - " + groups[i].ordered_teams[j].country + "  • Wins: " + groups[i].ordered_teams[j].wins + "  - Draws: " + groups[i].ordered_teams[j].draws + "  - Losses: " +groups[i].ordered_teams[j].losses));
            }
        }

    });
};

var getInfoByMatches = () => {

    AjaxWrapper.get("http://worldcup.sfg.io/matches", (data) => {
        var matches = data;
        var table = document.getElementById("matchesTable");

        for (var i = 0; i < matches.length; i++) {
            var tr = table.appendChild(document.createElement("tr"));


            var splittedDate = (matches[i].datetime).split("T",1);

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(splittedDate));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].away_team.code));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].home_team.code));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].away_team.country));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].home_team.country));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].location));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].venue));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].winner));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].status));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].home_team.goals));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(matches[i].away_team.goals));

        }
    });

}