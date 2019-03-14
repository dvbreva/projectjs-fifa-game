var printHistory = () => {

    LocalStorage.addHistoryItem("history", "Viewed history page");

    var div = document.getElementById("history");
    var historyArray = LocalStorage.printHistoryItem("history");
    for (var i = 0; i < historyArray.length; i++) {
        div.innerHTML += historyArray[i] + "<br>";
    }
};


var getInfoByGroups = () => {

    LocalStorage.addHistoryItem("history", "Viewed groups page");

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
            newLine.innerHTML = groups[i].letter;
            td.appendChild(newLine);

            for (var j = 0; j < groups[i].ordered_teams.length; j++) {
                var ul = td.appendChild(document.createElement("ul"));
                var li = ul.appendChild(document.createElement("li"));
                li.appendChild(document.createTextNode(groups[i].ordered_teams[j].fifa_code + " - " + groups[i].ordered_teams[j].country + "  • Wins: " + groups[i].ordered_teams[j].wins + "  - Draws: " + groups[i].ordered_teams[j].draws + "  - Losses: " + groups[i].ordered_teams[j].losses));
            }
        }

    });
};

var getInfoByMatches = () => {

    LocalStorage.addHistoryItem("history", "Viewed matches page");

    AjaxWrapper.get("http://worldcup.sfg.io/matches", (data) => {
        var matches = data;
        var table = document.getElementById("matchesTable");

        for (var i = 0; i < matches.length; i++) {
            var tr = table.appendChild(document.createElement("tr"));


            var splittedDate = (matches[i].datetime).split("T", 1);

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

var getInfoByTeams = () => {

    LocalStorage.addHistoryItem("history", "Viewed teams page");

    AjaxWrapper.get("http://worldcup.sfg.io/teams/", (data) => {
        var teams = data;
        var table = document.getElementById("teamsTable");

        for (var i = 0; i < teams.length; i++) {
            var tr = table.appendChild(document.createElement("tr"));


            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(teams[i].fifa_code));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(teams[i].country));


            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(teams[i].group_id));

            var td = tr.appendChild(document.createElement("td"));
            td.appendChild(document.createTextNode(teams[i].group_letter));


        }
    });
}

var getInfoBySearching = (country, venue, players) => {

    LocalStorage.addHistoryItem("history", "Viewed searching page");

    AjaxWrapper.get("http://worldcup.sfg.io/matches", (data) => {
        var matches = data;
        var resultString = "";
        document.getElementById("searchInfo").innerHTML = "";

        //there is no need for validation here i think because of the "required" attribute in the search.html file
        for (var i = 0; i < matches.length; i++) {

            if (country == (matches[i].home_team.country) && venue == matches[i].venue) {

                if (players == 0) {
                    resultString = `<p>Info for starting players >> Home Country: ${matches[i].home_team.country} at ${matches[i].venue}</p>`;
                    searchInfo.innerHTML += resultString;
                    console.log(resultString);

                    for (var j = 0; j < (matches[i].home_team_statistics.starting_eleven).length; j++) {
                        resultString = `<p>*${(matches[i].home_team_statistics.starting_eleven)[j].name}</p>`;
                        searchInfo.innerHTML += resultString;
                    }

                } else if (players == 1) {
                    resultString = `<p>Info for substitute players >> Home Country: ${matches[i].home_team.country} at ${matches[i].venue}</p>`;
                    searchInfo.innerHTML += resultString;
                    console.log(resultString);

                    for (var j = 0; j < (matches[i].home_team_statistics.substitutes).length; j++) {
                        resultString = `<p>*${(matches[i].home_team_statistics.substitutes)[j].name}</p>`;
                        searchInfo.innerHTML += resultString;
                    }

                }
            } else if (country == matches[i].away_team.country && venue == matches[i].venue) {

                if (players == 0) {
                    resultString = `<p>Info for starting players >> Away Country: ${matches[i].away_team.country} at ${matches[i].venue}</p>`;
                    searchInfo.innerHTML += resultString;
                    console.log(resultString);

                    for (var j = 0; j < (matches[i].away_team_statistics.starting_eleven).length; j++) {
                        resultString = `<p>*${(matches[i].away_team_statistics.starting_eleven)[j].name}</p>`;
                        searchInfo.innerHTML += resultString;
                    }

                } else if (players == 1) {
                    resultString = `<p>Info for substitute players >> Away Country: ${matches[i].away_team.country} at ${matches[i].venue}</p>`;
                    searchInfo.innerHTML += resultString;
                    console.log(resultString);

                    for (var j = 0; j < (matches[i].away_team_statistics.substitutes).length; j++) {
                        resultString = `<p>*${(matches[i].away_team_statistics.substitutes)[j].name}</p>`;
                        searchInfo.innerHTML += resultString;
                    }

                }

            }

        }

        if (resultString == "") {
            //console.log("just a TEST if nothing works");
            document.getElementById("searchInfo").innerHTML = "Nothing matches your criteria.";
        }

    });
}



var actionSubmitSearch = document.getElementById("searchButton");

actionSubmitSearch.addEventListener("click", (e) => {
    e.preventDefault();

    var country = document.getElementById("countryInput").value;
    var venue = document.getElementById("venueInput").value;
    var player = null;

    if (document.getElementById("elevenRadioButton").checked == true) {
        player = 0;
    } else if (document.getElementById("substituesRadioButton").checked == true) {
        player = 1;
    }

    getInfoBySearching(country, venue, player);

});