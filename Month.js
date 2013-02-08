(function (date) {
    "use strict";

    /**
     * Класс представляет календарный месяц
     *
     * @class Класс представляет календарный месяц
     * @augments date.Year
     * @param {String|Date|DateTime|int|null} [initDate]
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Month = function (initDate) {
        this._init(initDate);
    };

    date.Month.prototype = new date.Year();
    date.Month.prototype.constructor = date.Month;


    /**
     * @return {undefined}
     */
    date.Month.prototype._fit = function () {
        this._start = this._date.clone().setDayOfMonth(1).setTime(0, 0, 0);
        this._end = this._date.clone().setMonth(this._start.getMonth() + 1).setDayOfMonth(1).setTime(0, 0, 0);
    };


    /**
     * @return {Number}
     */
    date.Month.prototype.valueOf = function () {
        return this.getMonth();
    };


    /**
     * @return {Number}
     */
    date.Month.prototype.getMonth = function () {
        return this._start.getMonth();
    };


    /**
     * @param {Number} arg
     * @return {date.Month}
     */
    date.Month.prototype.setMonth = function (arg) {
        this._start.setMonth(arg);
        this._end.setMonth(arg + 1);
        return this;
    };


    /**
     * @param {Number} n
     * @return {date.Month}
     */
    date.Month.prototype.toNext = function (n) {
        if (!n) n = 1;
        return this.clone().setMonth(this.getMonth() + n);
    };

    /**
     * @param {Number} n
     * @return {date.Month}
     */
    date.Month.prototype.toPrev = function (n) {
        if (!n) n = 1;
        return this.clone().setMonth(this.getMonth() - n);
    };


    /**
     * @param {Number} n
     * @return {date.Day}
     */
    date.Month.prototype.toDay = function (n) {
        var day = new date.Day((new date.DateTime(this._start)).setDayOfMonth(n));
        if (this.includes(day)) {
            return day;
        }
    };

    /**
     * @return {date.Day[]}
     */
    date.Month.prototype.toDays = function () {
        var result = [], day = this._start.clone(), end = this._end.clone();
        end._date.setDate(0);

        for (var i = 0, l = end.getDayOfMonth(); i < l; i++) {
            result[i] = new date.Day(day.setDayOfMonth(i + 1));
        }

        return result;
    };
})(this.mailru_datetime_ns || this)
