(function (date) {
    "use strict";

    /**
     * Класс для представления длительности в секундах
     *
     * @class Класс для представления длительности в секундах
     * @augments date.ACommon
     * @property {Number} _period Длительность в секундах
     * @param {date.Period|date.Interval|Number} arg
     * @throws Error {Error} если тип аргумент не соответсвует ожидаемому (и не приводится к нему)
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Period = function (arg) {
        this._period;

        if (arg instanceof date.Period) {
            this._period = arg.valueOf();
        } else if (arg instanceof date.Interval) {
            this._period = arg.toPeriod();
        } else if (isNaN(parseInt(arg))) {
            throw new Error("Unsupported argument type");
        } else {
            this._period = parseInt(arg);
        }
    };


    date.Period.prototype = new date.ACommon();
    date.Period.prototype.constructor = date.Period;


    /**
     * @param {String} str
     * @return {Boolean}
     */
    date.Period.isParsableAsPeriod = function (str) {
        return !isNaN(parseInt(str));
    };

    /**
     * @param {date.DateTime} arg
     * @param {date.Period|date.Interval|String} diff
     * @return {date.DateTime}
     */
    date.Period.addToDate = function (arg, diff) {
        var period;

        if (!arg instanceof date.DateTime) {
            throw new Error("Unsupported argument type");
        }

        if (diff instanceof date.Period) {
            period = diff;
        } else if (diff instanceof date.Interval) {
            period = diff.toPeriod();
        } else {
            period = new date.Period(diff);
        }

        return new date.DateTime(arg.valueOf() + period);
    };


    /**
     * @return {Number}
     */
    date.Period.prototype.valueOf = function () {
        return this._period;
    };

    /**
     * @return {String}
     */
    date.Period.prototype.toString = function () {
        return this._period.toString();
    };


    /**
     * @return {Number}
     */
    date.Period.prototype.getWeeks = function () {
        return Math.floor(this.getDays() / 7);
    };

    /**
     * @return {Number}
     */
    date.Period.prototype.getDays = function () {
        return Math.floor(this.getHours() / 24);
    };

    /**
     * @return {Number}
     */
    date.Period.prototype.getHours = function () {
        return Math.floor(this.getMinutes() / 60);
    };

    /**
     * @return {Number}
     */
    date.Period.prototype.getMinutes = function () {
        return Math.floor(this.getSeconds() / 60);
    };

    /**
     * @return {Number}
     */
    date.Period.prototype.getSeconds = function () {
        return Math.floor(this._period / 1000);
    };
})(this.mailru_datetime_ns || this)
