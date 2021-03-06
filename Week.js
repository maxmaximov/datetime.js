(function (date) {
    "use strict";

    /**
     * Класс представляет календарную неделю
     *
     * @class Класс представляет календарную неделю
     * @augments date.ACalendar
     * @param {String|Date|DateTime|int|null} [initDate]
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Week = function (initDate) {
        this._init(initDate);
    };

    date.Week.prototype = new date.ACalendar();
    date.Week.prototype.constructor = date.Week;


    /**
     * @return {undefined}
     */
    date.Week.prototype._fit = function () {
        this._start = this._date.clone().setDayOfWeek(1).setTime(0, 0, 0);
        this._end = this._date.clone().setDayOfWeek(8).setTime(0, 0, 0);
    };


    /**
     * @return {Number}
     */
    date.Week.prototype.valueOf = function () {
        return this.getWeek();
    };


    /**
     * @return {Number}
     */
    date.Week.prototype.getWeek = function () {
        return this._start.getWeek();
    };


    /**
     * @param {Number} arg
     * @return {date.Week}
     */
    date.Week.prototype.setWeek = function (arg) {
        console.warn("setWeek - DEPRECATED");
        var clone = this._start.clone().setMonth(1).setDayOfMonth(1).getWeek();
        this._start.setWeek(arg);
        this._end.setWeek(arg + 1);
        return this;
    };


    /**
     * @param {Number} n
     * @return {date.Week}
     */
    date.Week.prototype.toNext = function (n) {
        if (!n) n = 1;
        return new Week(this._start.valueOf() + 7 * n * 86400000, this._end.valueOf() + 7 * n * 86400000);
    };

    /**
     * @param {Number} n
     * @return {date.Week}
     */
    date.Week.prototype.toPrev = function (n) {
        if (!n) n = 1;
        return new Week(this._start.valueOf() - 7 * n * 86400000, this._end.valueOf() - 7 * n * 86400000);
    };


    /**
     * @param {Number} n
     * @return {date.Day}
     */
    date.Week.prototype.toDay = function (n) {
        var day = new date.Day((new date.DateTime(this._start)).setDayOfWeek(n));
        if (this.includes(day)) {
            return day;
        }
    };

    /**
     * @param {Number} n
     * @return {date.Day[]}
     */
    date.Week.prototype.toDays = function () {
        var result = [], day = this._start.clone();

        for (var i = 0; i < 7; i++) {
            result[i] = new date.Day(day.setDayOfWeek(i + 1));
        }

        return result;
    };
})(this.mailru_datetime_ns || this)
