import React from 'react';
import { Card, Button, Table } from 'semantic-ui-react';
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
    const deaths = overview.map(stat => stat.deaths)
    const recovered = overview.map(stat => stat.recovered)
    const confirmed = overview.map(stat => stat.confirmed)
    const country = overview.map(stat => stat.country)
    const city = overview.map(stat => stat.city)
    const state = overview.map(stat => stat.province)
    const lastUpdate = overview.map(stat => stat.lastUpdate)

    const tableData = [
        {
            state: state,
            deaths: deaths,
            recovered: recovered,
            confirmed: confirmed,
            country: country,
            city: city,
            lastUpdate: lastUpdate
        }


    ]
    const headerRow = ['State', 'Deaths', 'Recovered', 'Confirmed Cases', 'Country', 'City', 'lastUpdate']

    const renderBodyRow = ({ deaths, recovered, confirmed, state, city, lastUpdate, country }, i) => ({
        cells: [
            state || 'Not specified',
            deaths || 'Not specified',
            recovered || 'Not specified',
            confirmed || 'Not specified',
            country || 'Not specified',
            city || 'Not specified',
            lastUpdate || 'Not specified'
        ]

    })
   

    const TableData = () => (
        <Table
        //     // tableData={tableData}
        //     // renderBodyRow={renderBodyRow}
        //     // celled
        //     // structured
        //     // headerRow={headerRow}
        />


    )

    return (
        <div>
            


            <Table
            tableData={tableData}
            renderBodyRow={renderBodyRow}
            celled
            structured
            headerRow={headerRow}
            columns='16'
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell content='Country' rowSpan='2'></Table.HeaderCell>
                        <Table.HeaderCell rowSpan='3'>State</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='3'>City</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center' colSpan='3'>Status</Table.HeaderCell>  
                        <Table.HeaderCell colSpan='3'>Last Updated</Table.HeaderCell>


                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>Deaths</Table.HeaderCell>
                        <Table.HeaderCell>Recoveries</Table.HeaderCell>
                        <Table.HeaderCell>Confirmed Cases</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row textAlign='center'>
       
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>Test</Table.Cell>
                        <Table.Cell>Test</Table.Cell>

                    </Table.Row>
                </Table.Body>

            </Table>
        </div>
    )
}
