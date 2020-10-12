var app = new Vue({
  el: '#app',
  data: {
      members: [],
      statistics: {
          "numberOfDemocrats": 0,
          "numberOfRepublicans": 0,
          "numberOfIndependents": 0,

          "averageVotesWithPartyForDemocrats": 0,
          "averageVotesWithPartyForRepublicans": 0,
          "averageVotesWithPartyForIndependents": 0,

          "leastEngagedNames": 0,
          "mostEngagedNames": 0,

          "leastLoyalNames": 0,
          "mostLoyalNames": 0,
      },
  }
});

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
    method: "GET",
    headers: new Headers({
        "X-API-Key": 'adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa'
    })
}).then(function (response) {
    if (response.ok)
        return response.json();
    throw new Error(response.statusText);
}).then(function (json) {
    console.log(json);
    app.members = json.results[0].members
  
})



// document.getElementById("senate-data").innerHTML = crearTabla(data);

// function crearTabla(data) {
//   return data.map(function (element) {
//     return "<tr>" +

//       "<td>" + "<a href=" + element.url + ">" + element.last_name + ", " + element.first_name + " " + (element.middle_name || "") + "</a>" + "</td>" +
//       "<td>" + element.party + "</td>" +
//       "<td>" + element.state + "</td>" +
//       "<td>" + element.seniority + "</td>" +
//       "<td>" + element.votes_with_party_pct + "%" + "</td>" +

//       "</tr>"
      
//   }).join("");
// }

