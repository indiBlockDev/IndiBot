'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const tg = new Telegram.Telegram('215751304:AAE7L9IpoF1UMhH6VIoq4shTv6gy2tpNCQs')
const request = require('request');


class PriceControllerBittrex extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  priceHandler($) {
    function getCurrency (type) {
      return {
        'ltc': 'BTC-LTC',
        'doge': 'BTC-DOGE',
        'eth': 'BTC-ETH'
      }[type];
    }
    var c = getCurrency($.query.curr)
    var uri = 'https://bittrex.com/api/v1.1/public/getticker?market=' + c
    request({url: uri , json: true}, function(err, res, json) {
      if (!err && res.statusCode === 200) {
        var info = JSON.stringify(json.result)
        $.sendMessage(info)
      }
    });
  }
  get routes() {
    return {
      '/trex :curr': 'priceHandler'
    }
  }
}
class PriceControllerPoloniux extends TelegramBaseController {
  /**
   * @param {Scope} $
   */
  priceHandler($) {
    function getCurrency (type) {
      return {
        'ltc': 'BTC_LTC',
        'doge': 'BTC_DOGE',
        'eth': 'BTC_ETH'
      }[type];
    }
    var c = getCurrency($.query.curr)
    console.log('c is :'+ c)
    var uri = 'https://poloniex.com/public?command=returnTicker'
    request({url: uri}, function(err, res, json) {
      if (!err && res.statusCode === 200) {
        var info = JSON.stringify(json.c)
        // console.log('json got is :' + JSON.stringify(json))
        $.sendMessage(info)
      } else {console.log('what')}
    });
  }
  get routes() {
    return {
      '/polo :curr': 'priceHandler'
    }
  }
}

tg.router
  .when('/trex :curr', new PriceControllerBittrex())

tg.router
  .when('/polo :curr', new PriceControllerPoloniux())