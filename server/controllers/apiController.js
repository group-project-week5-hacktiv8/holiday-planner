const axios = require('axios')

class ApiController {
    static getHoliday(req, res, next) {
        axios.get(`https://calendarific.com/api/v2/holidays?api_key=${process.env.CALENDARIFICAPIKEY}&country=ID&year=2020`)
            .then(({ data }) => {
                res.status(200).json(data)
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
            headers: { "APC-Auth": process.env.APC-Auth, 'APC-Auth-Secret': process.env.APC-Auth-Secret }
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
}

module.exports = ApiController