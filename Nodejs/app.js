const bodyParser = require('body-parser')
const express=require('express')
const app = express()
const mysql = require('mysql')
const exphbs = require('express-handlebars');
const port=3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))
app.use('/js',express.static(__dirname + 'public/js'))
app.use('/img',express.static(__dirname + 'public/img'))
app.use('/html',express.static(__dirname + 'public/html'))

const connection = mysql.createConnection({
host:'localhost',
user:'sqluser',
password:'password',
database:'airline'
})

app.set('views','./views')
// const handlebars = exphbs.create({ extname: '.hbs',});
// app.engine('.hbs', handlebars.engine);
app.set('view engine','ejs')
app.get('', (req, res) => {
    res.render('index')
    connection.query('SELECT * FROM FLIGHT', (error, rows) => {
        if(error) throw error;
        if(!error){
            console.log(rows)
        }
    } )
})


app.get('/flightDetails', (req, res) => {
    connection.query('SELECT * FROM FLIGHT', (error, rows) => {
        if(error) throw error;
        if(!error){
            res.render('flightDetails', {rows})
        }
    } )
    
})

app.get('/billing', (req, res) => {
    res.render('billing')
})

app.get('/createAccount', (req, res) => {
    res.render('createAccount')
})

app.get('/departure', (req, res) => {
    res.render('departure')
})

app.get('/returnFlight', (req, res) => {
    res.render('returnFlight')
})

app.get('/rules', (req, res) => {
    res.render('rules')
})

app.get('/ticketQty', (req, res) => {
    res.render('ticketQty')
})

app.get('/greatDeals', (req, res) => {
    res.render('greatDeals')
})

app.get('/header', (req, res) => {
    res.render('header')
})

app.get('/login', (req, res) => {
    res.render('login')
    })

app.post('/search', (req, res) => {
    let origin = req.body.origin;
    let destination = req.body.password;
    let class1 = req.body.class;
    let start = req.body.start;
    let back = req.body.return;

    console.log(origin,destination,class1,start,back,password);
    if (origin != null && destination != null && start != null && back != null){
        //res.status(400).send('Cannot find user')
        connection.query('SELECT * from Flight where orig = ? and dest = ? and fdate = ? ',[origin,destination,start,back], (error, rows) => {
            if(error) throw error;
            if(rows.length > 0){
                res.render('returnFlight',{rows})
            }
            });
    }
    else if (username && password){
        res.status(400).send(' ')
        }
     } );

app.post('/auth', (req, res) => {
    let origin = req.body.origin;
    let destination = req.body.destination;
    let class1 = req.body.classsection;
    let start = req.body.start;
    let back = req.body.return;

    console.log(origin, destination, class1, start, back);
    if (origin != null && destination != null && start != null && back != null) {
        //res.status(400).send('Cannot find user')
        connection.query('SELECT * from Flight where orig = ? and dest = ? and fdate = ? ', [origin, destination, start], (error, rows) => {
            if (error) throw error;
            if (rows.length > 0) {
                res.render('returnFlight', { rows })
            }
        });
    }
    
});

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/help', (req, res) => {
    res.render('help')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.listen(port,()=>console.info(`Listening on port ${port}`))