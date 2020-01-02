const {
    Median
} = require('../models');
const Random = require('../module/random');
const Op = require('sequelize').Op;
const Exchange = require('../module/exchange');

const promise = async (json, start, result) => {
    result[start / 3].info = json.slice(start, start + 3);
}

module.exports = {
    foodRead: async ({
        cityId,
    }) => {
        return new Promise(async (resolve, reject) => {
            const result = [];
            const CityId = cityId;
            try {
                const test = await Median.findAll({
                    where: {
                        category: {
                            [Op.notLike]: "%호텔%"
                        },
                        cityId: cityId,
                    },
                    attributes: ['cityId', 'category', 'cost', 'urlFood'],
                });
                for (let i = 0; i < 3; i++) {
                    const bmp = test[i].dataValues;
                    const obj = new Object();
                    obj.category = bmp.category;

                    // obj.cost = bmp.cost;
                    Exchange.exchange({
                        base: "USD",
                        cost: bmp.cost,
                        to: "KRW"
                    }).then(({
                        result
                    }) => {
                        obj.cost = result
                        console.log(obj.cost)
                    }).catch(err => {
                        console.log(err)
                    })

                    obj.url = bmp.urlFood
                    obj.info = [];
                    result.push(obj);
                }
                await Random.randomFood({
                        CityId
                    })
                    .then(async ({
                        json
                    }) => {
                        Promise.all([promise(json, 0, result), promise(json, 3, result), promise(json, 6, result)]).then(function () {
                            resolve({
                                result
                            })
                        })

                    }).catch(err =>
                        console.log(err))
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    },
    hotelRead: async ({
        cityId,
    }) => {
        return new Promise(async (resolve, reject) => {
            const result = [];
            const CityId = cityId;
            try {
                const test = await Median.findAll({
                    where: {
                        category: {
                            [Op.like]: "%호텔%"
                        },
                        cityId: cityId,
                    },
                    attributes: ['cityId', 'category', 'cost', 'urlHotel'],
                });
                for (let i = 0; i < 4; i++) {
                    const bmp = test[i].dataValues;
                    const obj = new Object();
                    obj.category = bmp.category;
                    // obj.cost = bmp.cost;// 여기(bmp가 달러 : db)
                    Exchange.exchange({
                        base: "USD",
                        cost: bmp.cost,
                        to: "KRW"
                    }).then(({
                        result
                    }) => {
                        obj.cost = result
                        console.log(obj.cost)
                    }).catch(err => {
                        console.log(err)
                    })
                    obj.url = bmp.urlHotel
                    obj.info = [];
                    result.push(obj);
                }
                await Random.randomHotel({
                        CityId
                    })
                    .then(async ({
                        json
                    }) => {
                        Promise.all([promise(json, 0, result), promise(json, 3, result), promise(json, 6, result), promise(json, 9, result)]).then(function () {
                            console.log(result[1].info);
                            resolve({
                                result
                            })
                        })

                    }).catch(err =>
                        console.log(err))
            } catch (err) {
                console.log(err);
                reject(err);
            }
        })
    },
}