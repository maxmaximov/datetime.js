(function (date) {
    "use strict";

    /**
     * Класс представляет календарный день
     *
     * @class Класс представляет календарный день
     * @augments date.Month
     * @param {String|Date|DateTime|int|null} [initDate]
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Day = function (initDate) {
        this._init(initDate);
    };

    date.Day.prototype = new date.Month();
    date.Day.prototype.constructor = date.Day;


    /**
     * @return {undefined}
     */
    date.Day.prototype._fit = function () {
        this._start = this._date.clone().setTime(0, 0, 0);
        this._end = this._date.clone().setDayOfMonth(this._start.getDayOfMonth() + 1).setTime(0, 0, 0);
    };


    /**
     * @return {Number}
     */
    date.Day.prototype.valueOf = function () {
        return this.getDay();
    };


    /**
     * @return {Number}
     */
    date.Day.prototype.getDay = function() {
        return this.getDayOfMonth();
    };

    /**
     * @return {Number}
     */
    date.Day.prototype.getDayOfMonth = function() {
        return this._start.getDayOfMonth();
    };

    /**
     * @return {Number}
     */
    date.Day.prototype.getDayOfWeek = function() {
        return this._start.getDayOfWeek();
    };

    /**
     * @return {Number}
     */
    date.Day.prototype.getWeek = function () {
        return this._start.getWeek();
    };


    /**
     * @param {Number} arg
     * @return {date.Day}
     */
    date.Day.prototype.setDay = function (arg) {
        return this.setDayOfMonth(arg);
    };

    /**
     * @param {Number} arg
     * @return {date.Day}
     */
    date.Day.prototype.setDayOfMonth = function (arg) {
        this._start.setDayOfMonth(arg);
        this._end = this._start.add("P1D");
        return this;
    };

    /**
     * @param {Number} arg
     * @return {date.Day}
     */
    date.Day.prototype.setDayOfWeek = function (arg) {
        this._start.setDayOfWeek(arg);
        this._end = this._start.add("P1D");
        return this;
    };


    /**
     * @param {Number} n
     * @return {date.Day}
     */
    date.Day.prototype.toNext = function (n) {
        if (!n) n = 1;
        return this.clone().setDay(this.getDay() + n);
    };

    /**
     * @param {Number} n
     * @return {date.Day}
     */
    date.Day.prototype.toPrev = function (n) {
        if (!n) n = 1;
        return this.clone().setDay(this.getDay() - n);
    };


    /**
     * @return {date.Month}
     */
    date.Day.prototype.toMonth = function () {
        return new date.Month(this._start);
    };

    /**
     * @return {date.Week}
     */
    date.Day.prototype.toWeek = function () {
        return new date.Week(this._start);
    };


    /**
     * @return {Boolean}
     */
    date.Day.prototype.isWeekend = function () {
        return this._start.getDayOfWeek() > 5;
    };


    /**
     * @return {date.Hour[]}
     */
    date.Day.prototype.toHours = function () {
        var result = [], hour = this._start.clone();

        for (var i = 0; i < 24; i++) {
            result[i] = new date.Hour(hour.setHour(i));
        }

        return result;
    };

    /**
     * @return {date.Minute[]}
     */
    date.Day.prototype.toMinutes = function () {
        var result = [];
        var hours = this.toHours();

        hours.forEach(function(hour) {
            result = result.concat(hour.toMinutes());
        })

        return result;
    };
})(this.mailru_datetime_ns || this)
