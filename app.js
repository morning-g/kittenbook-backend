// Importes
const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const session = require('express-session')
const Sequelize = require('sequelize');
const mysql2 = require("mysql2");
var database = require("./database")

var SequelizeStore = require("connect-session-sequelize")(session.Store);

// Se crea la app
const app = express();
// Puerto del servidor local
const port = process.env.PORT || 3005;

console.log("Mode: " + process.env.NODE_ENV);
console.log("Port: " + port);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "https://kittenbook.software");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.setHeader('Access-Control-Allow-Private-Network', "true");
    next();
});
const corsOptions = {
    origin: 'https://kittenbook.software',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cookieParser());
var myStore = new SequelizeStore({
    db: database.db
});
app.use(session({
    secret: "d02425c564fbcc3a24fa78ccc2ea9b4d81e527b0b9a45c97a6f0f5be720628e1",
    store: myStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax'
    },
}));
myStore.sync();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// Importar los archivos de las rutas
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/api/usuarios");
const notesRouter = require("./routes/api/notas");
const historyRouter = require("./routes/api/reticula");
const scheduleRouter = require("./routes/api/horario");
const tasksRouter = require("./routes/api/tareas");
const classesRouter = require("./routes/api/materias")

// Se asignan las rutas del servidor a los archivos correspondientes en la carpeta routes
app.use("/", indexRouter);
app.use("/api/usuarios", usersRouter);
app.use("/api/tareas", tasksRouter);
app.use("/api/historial", historyRouter);
app.use("/api/horario", scheduleRouter);
app.use("/api/notas", notesRouter);
app.use("/api/materias", classesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
