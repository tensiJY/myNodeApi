# express

```
npm install --save express
```

# body-parser

```
npm install --save body-parser
```

##

```
//app.use(bodyParser.urlencoded()); //  x-www-form-urlencoded
app.use(bodyParser.json()); //  application/json
```

# nodemon

```
npm install --save nodemon
```

## scripts

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./app.js",
    "dev": "nodemon ./app.js"
  },
```

"dependencies": {
"body-parser": "^1.20.1",
"express": "^4.18.2",
"nodemon": "^2.0.20"
}
