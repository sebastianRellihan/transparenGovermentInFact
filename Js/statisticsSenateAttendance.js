var app = new Vue({
  el: '#app',
  data: {
      members: [],
      statistics: {
          "numberOfDemocrats": 0,   
          "numberOfRepublicans": 0,
          "numberOfIndependents": 0,

          "VotedDemocrats": 0,
          "VotedRepublicans": 0,
          "VotedIndependents": 0,

          "leastEngagedNames": 0,
          "mostEngagedNames": 0,

          "leastLoyalNames": 0,
          "mostLoyalNames": 0,

      },
      democrat: [],
      independent: [],
      republican: [],
      tenPercent: 0,
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
    app.members = json.results[0].members;
    app.democrat = app.members.filter(cantidadD);
    app.republican = app.members.filter(cantidadR);
    app.independent = app.members.filter(cantidadI);
    app.tenPercent = Math.round(app.members.length * 0.10);
    allStatistics();
  })


// Get the Number of Members in Each Party

function cantidadR(member) {
  return member.party == "R";
}

function cantidadD(member) {
  return member.party == "D";
}

function cantidadI(member) {
  return member.party == "I";
}

function allStatistics (){

app.statistics.numberOfDemocrats = app.democrat.length;
app.statistics.numberOfRepublicans = app.republican.length;
app.statistics.numberOfIndependents = app.independent.length;

app.statistics.VotedDemocrats = democratAverage(app.democrat);
app.statistics.VotedRepublicans = republicanAverage(app.republican);
app.statistics.VotedIndependents = independentAverage(app.independent);

app.statistics.leastEngagedNames = leastVoters (app.members, app.tenPercent);
app.statistics.mostEngagedNames = mostVoters (app.members, app.tenPercent);
}


// Calculate the Average "Votes with Party" for Each Party

function democratAverage(Democrat) {
  var sumaDemocrat = 0;
  Democrat.forEach(members => {
    sumaDemocrat = sumaDemocrat + members.votes_with_party_pct;
  });
  return Math.round(sumaDemocrat / Democrat.length);
}

function republicanAverage(Republican) {
  var sumaRepublican = 0;
  Republican.forEach(members => {
    sumaRepublican = sumaRepublican + members.votes_with_party_pct;
  });
  return Math.round(sumaRepublican / Republican.length);
}

function independentAverage(Independent) {
  var sumaIndependent = 0;
  if (Independent == 0) {
    var result = 0;
  } else {
    Independent.forEach(members => {
      sumaIndependent = sumaIndependent + members.votes_with_party_pct;
    });
    var result = Math.round(sumaIndependent / Independent.length);
  }
  return result;
}


// Least Engaged

function leastVoters (array, percent) {
  var leastVotes = array.sort(function (a, b) {
    return b.missed_votes_pct - a.missed_votes_pct;
  }); 
  var votes = leastVotes.slice(0, percent);
  return votes;
}


// Most Engaged

function mostVoters (array, percent) {
  var leastVotes = array.sort(function (a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  }); 
  var votes = leastVotes.slice(0, percent);
  return votes;
}

