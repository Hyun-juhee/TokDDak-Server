const ShopService = require('./service');
const rm = require('../module/util/responseMessage');
const utils = require('../module/util/utils');
const sc = require('../module/util/statusCode');

module.exports = {
    readAll: async (req, res) => {
        ShopService.readAll()
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        });
    },
    readOne: async (req, res) => {
        const {
            id
        } = req.body;
        if(!id) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ShopService.readOne({id})
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    create: async (req, res) => {
        const {
            
            // ??
        } = req.body;
        if(!host) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ShopService.create({host, introduce})
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            res.send(err);
        })
    },
    update: async (req, res) => {
        const {
            id,
            introduce
        } = req.body;
        if (!id || !introduce) {
            const missParameters = Object.entries({
                id,
                    introduce
                })
                .filter(it => it[1] == undefined).map(it => it[0]).join(',');
            res.send(utils.successFalse(sc.BAD_REQUEST, `${rm.NULL_VALUE}, ${missParameters}`));
            return;
        }
        ShopService.update({id, introduce})
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
    delete: async (req, res) => {
        const {
            id
        } = req.body;
        if(!id) {
            res.send(utils.successFalse(sc.BAD_REQUEST, rm.NULL_VALUE));
            return;
        }
        ShopService.delete({blogId})
        .then(({
            json
        }) => 
            res.send(json)
        ).catch(err => {
            console.log(err);
            res.send(utils.successFalse(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
        })
    },
}