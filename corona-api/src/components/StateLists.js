import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';


export default function StateList(props) {
    const [overview, setOverview] = React.useState([]);

    React.useEffect(() => {

        // fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/usastates.php", 
        fetch('https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=America', {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
                "x-rapidapi-key": "89f41491e5mshaea6b66e1292021p16a5bajsn0d384a8b42d0"
            }
        })
            .then(response => {

                response.json().then(data => setOverview(data.data.covid19Stats));
                // console.log(overview)
            })
            .catch(err => {
                console.log(err);
            });
    })

    /*
    city: ""
    province: "Alberta"
    country: "Canada"
    lastUpdate: "2020-03-27 23:27:32"
    keyId: "Alberta, Canada"
    confirmed: 542
    deaths: 2
    recovered: 0


    =====
    city: "Abbeville"
    province: "South Carolina"
    country: "US"
    lastUpdate: "2020-03-27 22:14:55"
    keyId: "Abbeville, South Carolina, US"
    confirmed: 4
    deaths: 0
    recovered: 0

    =====
    state: "Oregon"
    cases: "1"
    sex: ""
    age: ""
    date: "Feb. 29"
    case_number: "17th"
    location: ""
     */

    return (
        <div className="state-container">
            {
                overview.map(stat => (
                    <Card 
                    key={uuidv4()}
                    color="purple" style={{ border: '1px solid', margin: '2%' }}>
                        <Card.Content>

                            <Card.Header>{stat.country}</Card.Header>
                            <p>has confirmed</p>
                            <Card.Meta>{stat.recovered}</Card.Meta>
                            <p>recovered</p> <p>with</p>
                            <Card.Meta>{stat.deaths}</Card.Meta>
                            <p>deaths</p>
                            <p>last updated</p>
                            <Card.Meta>{stat.lastUpdate}</Card.Meta>
                            <p>This is their</p>
                            <Card.Description>{stat.confirmed}</Card.Description>
                            <p>cases</p>
                            <p>in</p>
                            <Card.Description>{stat.province}</Card.Description>
                        </Card.Content>

                    </Card>

                ))
            }

        </div>
    )
}
