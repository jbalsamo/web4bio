var url = "https://data.cdc.gov/resource/kgax-qmh9.json?$where=location_1%20IS%20NOT%20NULL",
    cities = [],
    plat = [],
    plng = [],
    psize = [];

var data = [{
    type: 'scattergeo',
    locationmode: 'USA-states',
    lat: [],
    lon: [],
    hoverinfo: 'text',
    text: [],
    marker: {
        size: [],
        line: {
            color: 'black',
            width: 2
        },
    }
}];

var layout = {
    title: '2014 Deaths in 122 US Cities',
    showlegend: false,
    geo: {
        scope: 'usa',
        projection: {
            type: 'albers usa'
        },
        showland: true,
        landcolor: 'rgb(217, 217, 217)',
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: 'rgb(255,255,255)',
        countrycolor: 'rgb(255,255,255)'
    },
};

$(document).ready(function(){
    jQuery.getJSON(url,function (data,suc) {
        data.map(function (row) {
            name = row.location_1_city;
            lon = parseFloat(row.location_1.coordinates[0]);
            lat = parseFloat(row.location_1.coordinates[1]);
            if(row.all_causes_by_age_years_all_ages != "-" && row.all_causes_by_age_years_all_ages != "U" && typeof row.all_causes_by_age_years_all_ages != "undefined") {
                deaths = parseInt(row.all_causes_by_age_years_all_ages);
            } else {
                deaths = 0;
            }
            console.log(typeof(deaths));

            plng[name] = lon;
            plat[name] = lat;
            cities[name] = name;
            if(psize[name] != null) {

                psize[name] = psize[name]+deaths;
            } else {
                psize[name] = deaths;
            }
        });
        data[0].text = cities;
        data[0].lat = plat;
        data[0].lon = plng;
        data[0].marker.size = psize;


        Plotly.plot("maparea", data, layout, {showLink: false});

    });






});
