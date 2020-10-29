const axios = require('axios')

class ApiController {
    static getHoliday(req, res, next) {
        axios.get(`https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFICAPIKEY}&country=ID&year=2020`)
            .then(({ data }) => {
                let newData = []
                data.response.holidays.forEach(el => {
                    newData.push({
                        name: el.name,
                        description: el.description,
                        date: el.date.iso
                    })
                })
                res.status(200).json(newData)
            })
            .catch(err => {
                return next(err)
            })
    }

    static searchAirport(req, res, next) {
        let {term} = req.params
        axios({
            url: `https://www.air-port-codes.com/api/v1/multi?term=${term}`,
            method: 'post',
            headers: { "APC-Auth": 'b294acc3ce', 'APC-Auth-Secret': 'e4c5fb72ac6badf' }
        })
            .then(({data}) => {
                let newdata = []
                data.airports.forEach(el => {
                    newdata.push({Name: el.name, City: el.city, Iata: el.iata, Country: el.country.name})
                });
                res.status(200).json(newdata)
            })
            .catch(err => {
                next(err);
            })
    }

// API to get flight price, required origin, destination and date
// still dont know how to get the parameters

    static getFlight(req, res, next) {
        // to get data please add the body { origin, destination, date }
        const { origin, destination, date } = req.body
        axios({
            "method": "GET",
            "url": `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/ID/IDR/en-US/${origin.toUpperCase()}-sky/${destination.toUpperCase()}-sky/${date}`,
            "headers": {
                "content-type":"application/octet-stream",
                "x-rapidapi-host": process.env.RAPIDAPIHOST,
                "x-rapidapi-key":process.env.RAPIDAPIKEY,
                "useQueryString":true
            },"params": {
                "inboundpartialdate":date
            }
        })
        .then(({data}) => {
            let newData = []
            data.Quotes.forEach(el => {
                newData.push("Quotes", {
                    Price: el.MinPrice, 
                    Direct: el.Direct, 
                    Date: el.OutboundLeg.DepartureDate,
                    MaskapaiId: el.OutboundLeg.CarrierIds[0]
                })
            })
            data.Carriers.forEach(el => {
                newData.push("Carrier", {
                    MaskapaiId: el.CarrierId,
                    MaskapaiName: el.Name
                })
            })
            res.status(200).json(newData)
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
        }

        // API to get Corona data
    static getCorona(req, res, next) {
        axios.get('http://opendata.arcgis.com/datasets/0c0f4558f1e548b68a1c82112744bad3_0.geojson')
        .then(({ data }) => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ApiController