const app = (express = require('express'))()
const cors = require('cors')
app.use(require('body-parser').json())
const database_name = "pingpong"
const static_folder = "front-end/dist/"
const mysql = require('mysql')

const sql = mysql.createConnection({
    host: 'localhost',
    user: 'nt',
    password: '123',
    database: database_name
})

app.use(cors())

app.post(/post.*data/, (req, res) => {
    sql.query(
            `INSERT INTO meccsek (nyert, vesztett, mikor) 
             VALUES('${req.body.nyert}', '${req.body.vesztett}', NOW())
             `,
            (err, pass) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(pass)
                }
            } 
    )
})

app.get(/getalldata/, (req, res) => {
    let nyt = {}
    sql.query(
        `SELECT * FROM user ORDER BY nev`,
        (err, users) => {
            if (err) {
                res.send(err)
            } else {
                sql.query(
                    `SELECT     *
                     FROM       meccsek 
                     ORDER BY   mikor`,
                    (err, meccsek) => {
                        if (err) {
                            res.send(err)
                        } else {
                            res.send({
                                users,
                                meccsek
                            })
                        }
                    })
            }

        }
    )
})

app.get(/getuserdata/, (req, res) => {
    let nyt = {}
    sql.query(
        `SELECT * FROM user ORDER BY nev`,
        (err, users) => {
            if (err) {
                res.send(err)
            } else {
                res.send({
                    users
                })
            }
        }
    )
})

app.get(/getgraphdata/, (req, res) => {
    let nyt = {}
    sql.query(
        `SELECT * FROM user ORDER BY nev`,
        (err, users) => {
            if (err) {
                res.send(err)
            } else {
                sql.query(
                    `SELECT     nyert,vesztett,count(nyert) n
                     FROM       meccsek 
                     GROUP BY   nyert, vesztett`,
                    (err, meccss) => {
                        if (err) {
                            res.send(err)
                        } else {
                            meccss.forEach( v => {
                                nyv=[v.nyert,v.vesztett].sort()
                                if (!nyt[nyv]) nyt[nyv]=0
                                if (nyv[0] === v.nyert) nyt[nyv] += v.n
                                else nyt[nyv] -= v.n
                            })                          
                            meccsek = Object.entries(nyt).map( v => {
                                kt = v[0].split(',')
                                if (v[1] < 0) {
                                    return { nyert: kt[0], vesztett: kt[1], n: -v[1] }
                                } else {
                                    return { nyert: kt[1], vesztett: kt[0], n: v[1] }
                                }    
                            }).filter( v=> v.n)                          
                            res.send({
                                users,
                                meccsek
                            })
                        } 
                    })
            }
                
        }
    )
})

app.use('/', express.static(static_folder))


app.listen(3000)