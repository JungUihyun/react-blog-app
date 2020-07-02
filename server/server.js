const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();
// sequelize.sync({ force: true });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const {
    Teacher,
    Sequelize: { Op }
} = require("./models");
sequelize.query('SET NAMES utf8;');

app.post("/add/data", (req, res) => {
    console.log(req, body);

    Teacher.create({
        name : req.body.data
    }).catch(err => {
        console.log(err)
        throw err;
    });
});

// 특정 데이터 조회하기 (where)
// app.get("/get/data", (req, res) => {
//     Teacher.findAll({
//         where: { name : 'James' }
//     }).then( result => {
//         res.send(result)
//     }).catch( err => {
//         throw err
//     });
// });
// ===  SELECT FROM * teachers WHERE name LIKE James
// Op.or - OR 연산자
// app.get('/get/data', (req, res) => {
//     Teacher.findAll({
//         where : { [Op.or]: [{ id : 1 }, { name : 'Alan' }] }
//     }).then( result => {
//         res.send(result)
//     }).catch( err => { throw err })
// })
// === id 값이 1이고 name 이 'Alan'인 데이터 
// 하나의 데이터 조회하기 (findOne, where)
// app.get("/get/data", (req, res) => {
//     Teacher.findOne({
//         where : { id : 2 }
//     }).then( result => {
//         res.send(result)
//     }).catch(err => { 
//         throw err 
//     })
// })
// id 값이 2인 데이터
// findAll - Array 형태로 클라이언트에 데이터 전송
// findOne - Object 형태로 클라이언트에 데이터 전송
//

// 데이터 가져오기
app.get("/get/data", (req, res) => {
    Teacher.findAll().then( result => { 
        res.send(result) 
    }).catch( err => {
        throw err 
    });
});  

// 데이터 변경하기 (update)
// app.post('/modify/data', (req, res) => {
//     Teacher.update({ name : req.body.modify.name }, {
//         where : { id : req.body.modify.id }
//     }).then( result => {
//         res.send(result) 
//     }).catch( err => { throw err })
// });   
// 여러개의 데이터 값 변경하기 ()
app.post('/modify/data', (req, res) => {
    Teacher.update({ name : 'Same_name' }, {
        where : { [Op.or] : [{ id : 1 }, { name : 'Alan' }]}
    }).then( result => {
        res.send(result)
    }).catch( err => {
        throw err
    })
});

// 데이터 삭제하기 (destroy)
app.post("delete/data", (req, res) => {
    Teacher.destroy({
        where : { id : req.body.delete.id }
    }).then( res.sendStatus(200) ).catch( err => {
        throw err
    })
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
});