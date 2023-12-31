const fs = require('fs');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const secret = 'softdev';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'JamesKolawatInpan',
    database: 'softdev'
})

const path = ""
const pathboostreport = "/resources/static/assets/reportpic"
const pathbuyerreport = "/resources/static/assets/buyerpic"

function tokenCheck (req, res, next) {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, secret, (err, decode) => {
            if (err) {
                req.isTokenValid = false;
            }
            else {
                req.isTokenValid = true;
                req.user = decode;
            }
            next();
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}

const BoosterReportConfirmation = async (req, res) => {
        const {start_pic, after_pic, uid, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, facebook, line, side, datetime} = req.body;
        try {
            console.log(file);
            if(req.file == undefined){
                return res.status(400).send({ message: "Please upload a file!" });
            }
            connection.query(
                'INSERT INTO report (start_pic, after_pic, uid, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, facebook, line, side, datetime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [pathboostreport+req.file['before_pic'], pathboostreport+req.file['after_pic'], uid, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, facebook, line, "Booster", datetime],
                function(err, results, fields) {
                    if(err) {
                        console.log(err);
                        res.send({
                            "code": 400,
                            "failed": "failed to upload report"
                        })
                    }
                    else{
                        console.log('The solution is: ', results);
                        res.send({
                            "code": 200,
                            "success": "upload report sucessfully",
                            "data": results,
                        });
                    }
                }
            )
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(`Error when trying upload BoosterReportConfirmation: ${error}`);
        }
}

const UserReportConfirmation = async (req, res) => {
        const {start_pic, after_pic, uid, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, facebook, line, side, datetime} = req.body;
        try {
            console.log(file);
            if(req.file == undefined){
                return res.status(400).send({ message: "Please upload a file!" });
            }
            connection.query(
                'INSERT INTO report (start_pic, after_pic, uid, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, facebook, line, side, datetime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [pathboostreport+req.file['before_pic'], pathboostreport+req.file['after_pic'], uid, before_tier, before_gold, before_diamond, before_marble, before_coupon, after_tier, after_gold, after_diamond, after_marble, after_coupon, facebook, line, "Employee", datetime],
                function(err, results, fields) {
                    if(err) {
                        console.log(err);
                        res.send({
                            "code": 400,
                            "failed": "failed to upload report"
                        })
                    }
                    else {
                        console.log('The solution is: ', results);
                        res.send({
                            "code": 200,
                            "success": "upload report sucessfully",
                            "data": results,
                        });
                    }
                }
            )
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(`Error when trying upload UserReportConfirmation: ${error}`);
        }
}

const ShopBuyerReportConfirmation = async (req, res) => {
        try {
            const {pic, detail, uid, facebook, line} = req.body;
            connection.query(
                'INSERT INTO buyerreport (pic, detail, uid, facebook, line) VALUES (?,?,?,?,?)',
                [pathbuyerreport+req.file['pic'], detail, uid, facebook, line],
                function(err, results, fields) {
                    if(err) {
                        console.log(err);
                        res.send({
                            "code": 400,
                            "failed": "failed to upload report"
                        })
                    }
                    else {
                        console.log('The solution is: ', results);
                        res.send({
                            "code": 200,
                            "success": "upload report sucessfully",
                            "data": results,
                        });
                    }
                }
            )
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(`Error when trying upload ShopBuyerReportConfirmation: ${error}`);
        }
}

const AdminIDConfirmation = async (req, res) => {
    try {
        connection.query(
            `
            SELECT sellorder.image, sellorder.order_name, users.user_name, sellorder.datetime FROM buyerreport
            INNER JOIN sellorder ON buyerreport.orderID = sellorder.orderID
            INNER JOIN users ON buyerreport.uid = users.uid
            `,
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "failed to load report"
                    })
                }
                else {
                    console.log('data : ', results);
                    res.send({
                        "code": 200,
                        "success": "load report sucessfully",
                        "data": results
                    });
                }
            }
        )
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error when trying load AdminIDConfirmation: ${error}`);
    }
}

const AdminJudgeID = async (req, res) => {
    try {
        const {uid} = req.body;
        connection.query(
            `SELECT sellorder.image, sellorder.order_name, users.user_name ,sellorder.datetime FROM buyerreport
            INNER JOIN sellorder ON buyerreport.orderID = sellorder.orderID
            INNER JOIN users ON buyerreport.uid = users.uid
            WHERE buyerreport.uid = ?
            `, [uid],
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                }
                else {
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "report registered sucessfully",
                        "data": results,
                    });
                }
            }
        )
        // load buyer info
        connection.query(
            `SELECT buyerreport.pic, buyerreport.uid, buyerreport.detail, users.user_email, users.con_num ,buyerreport.facebook, buyerreport.line, buyerreport.datetime
            FROM buyerreport
            INNER JOIN users ON buyerreport.uid = users.uid
            INNER JOIN sellorder ON buyerreport.orderID = sellorder.orderID
            WHERE uid = ?
            `, [uid],
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                }
                else {
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "report registered sucessfully",
                        "data": results,
                    });
                }
            }
        )

        // load seller info
        connection.query(
            `
            SELECT users.user_email, users.con_num
            FROM sellorder
            INNER JOIN ON users ON sellorder.sid = users.uid
            INNER JOIN ON buyerreport ON sellorder.OrderID = buyerreport.OrderID
            `,
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                }
                else {
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "report registered sucessfully"
                    });
                }
            }
        )
        
        // Judge report
        const {judge} = req.body;
        if (judge != "Approve") {
            connection.query(
                `
                DELETE FROM buyerreport WHERE uid = ?
                `, [uid],
                function(err, results, fields) {
                    if(err) {
                        console.log(err);
                        res.send({
                            "code": 400,
                            "failed": "failed to delete report"
                        })
                    }
                    else {
                        console.log('The solution is: ', results);
                        res.send({
                            "code": 200,
                            "success": "report registered sucessfully"
                        });
                    }
                }
            )
            res.send("Your report has been approved")
        }
        else{
            res.send("Your report has been rejected")
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error when trying load AdminJudgeID: ${error}`);
    }
}

const AdminBoostingConfirmation = async (req, res) => {
    try {
        // load booster info
        connection.query(
            `SELECT boosterdetail.card_pic, users.user_name, boostreportconfirm.datetime FROM users
            INNER JOIN boosterdetail ON users.uid = boosterdetail.uid
            INNER JOIN boostreportconfirm ON users.uid = boostreportconfirm.uid
            INNER JOIN boostorder ON users.uid = boostorder.boid OR users.uid = boostorder.eid
            `,
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "load report failed"
                    })
                }
                else {
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "load report sucessfully"
                    });
                }
            }
        )
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error when trying load AdminBoostingConfirmation: ${error}`);
    }
}

const AdminJudgeBoosting = async (req, res) => {
    try {
        const {uid, side} = req.body;

        // load report info
        connection.query(
            `SELECT boosterdetail.card_pic, users.user_name, boostreportconfirm.datetime FROM users
            INNER JOIN boosterdetail ON users.uid = boosterdetail.uid
            INNER JOIN boostreportconfirm ON users.uid = boostreportconfirm.uid
            INNER JOIN boostorder ON users.uid = boostorder.boid OR users.uid = boostorder.eid
            WHERE boostreportconfirm.uid = ? AND boostreportconfirm.side = ?
            `,[uid, side],
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "failed to load report"
                    })
                }
                else {
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "load report sucessfully"
                    });
                }
            }
        )
        // load report
        connection.query(
            `
            SELECT * FROM boostreportconfirm WHERE uid = ? AND side = ?
            `,
            [uid, side],
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                }
                else {
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "load report sucessfully"
                    });
                }
            }
        )

        // load user contact
        connection.query(
            `
            SELECT users.user_email, users.con_num
            FROM boostreportconfirm
            INNER JOIN users ON boostreportconfirm.uid = users.uid
            `,
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                }
            }
        )

        // load booster contact
        connection.query(
            `
            SELECT users.user_email, users.con_num
            FROM boostreportconfirm
            INNER JOIN users ON boostreportconfirm.uid = users.uid
            `,
            function(err, results, fields) {
                if(err) {
                    console.log(err);
                    res.send({
                        "code": 400,
                        "failed": "error ocurred"
                    })
                }
            }
        )

        // Judge report
        const {judge} = req.body;
        if (judge != "Approve") {
            connection.query(
                `
                DELETE FROM boostreportconfirm WHERE uid = ? AND side = ?
                `, [uid, side],
                function(err, results, fields) {
                    if(err) {
                        console.log(err);
                        res.send({
                            "code": 400,
                            "failed": "error ocurred"
                        })
                    }
                    else {
                        console.log('The solution is: ', results);
                        res.send({
                            "code": 200,
                            "success": "report registered sucessfully"
                        });
                    }
                }
            )
            res.send("Your report has been approved")
        }
        else{
            res.send("Your report has been rejected")
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error when trying load AdminJudgeBoosting: ${error}`);
    }
}

module.exports = {
    tokenCheck,
    BoosterReportConfirmation,
    UserReportConfirmation,
    ShopBuyerReportConfirmation,
    AdminIDConfirmation,
    AdminJudgeID,
    AdminBoostingConfirmation,
    AdminJudgeBoosting
}