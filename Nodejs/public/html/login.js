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

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});


app.post('/auth', (req, res) => {
    let origin = req.body.origin;
    let destination = req.body.password;
    let class1 = req.body.class;
    let start = req.body.start;
    let back = req.body.return;

    console.log(origin, destination, class1, start, back, password);
    if (origin != null && destination != null && start != null && back != null) {
        //res.status(400).send('Cannot find user')
        connection.query('SELECT * from Flight where orig = ? and dest = ? and fdate = ? ', [origin, destination, start, back], (error, rows) => {
            if (error) throw error;
            if (rows.length > 0) {
                res.render('returnFlight', { rows })
            }
        });
    }
    
});
app.listen(3000);