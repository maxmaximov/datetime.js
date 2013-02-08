(function (date) {
    "use strict";

    /**
     * Класс представляет календарный час
     *
     * @class Класс представляет календарный час
     * @augments date.Day
     * @param {String|Date|DateTime|int|null} [initDate]
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Hour = function (initDate) {
        this._init(initDate);
    };

    date.Hour.prototype = new date.Day();
    date.Hour.prototype.constructor = date.Hour;


    /**
     * @return {undefined}
     */
    date.Hour.prototype._fit = function () {
        this._start = this._date.clone().setMinute(0).setSecond(0);
        this._end = this._date.clone().setHour(this._start.getHour() + 1).setMinute(0).setSecond(0);
    };


    /**
     * @return {Number}
     */
    date.Hour.prototype.valueOf = function () {
        return this.getHour();
    };


    /**
     * @return {Number}
     */
    date.Hour.prototype.getHour = function () {
        return this._start.getHour();
    };


    /**
     * @param {Number} arg
     * @return {date.Hour}
     */
    date.Hour.prototype.setHour = function (arg) {
        this._start.setHour(arg);
        this._end.setHour(arg + 1);

        return this;
    };


    /**
     * @return {date.Hour}
     */
    date.Hour.prototype.toNext = function () {
        var clone = this.clone();
        clone._start = clone._start.addPeriod(60 * 60 * 1000);
        clone._end = clone._end.addPeriod(60 * 60 * 1000);

        return clone;
    };

    /**
     * @return {date.Hour}
     */
    date.Hour.prototype.toPrev = function () {
        var clone = this.clone();
        clone._start = clone._start.addPeriod(-60 * 60 * 1000);
        clone._end = clone._end.addPeriod(-60 * 60 * 1000);

        return clone;
    };


    /**
     * @return {date.Day}
     */
    date.Hour.prototype.toDay = function () {
        return new date.Day(this._start);
    };

    /**
     * @return {date.Minute[]}
     */
    date.Hour.prototype.toMinutes = function () {
        var result = [];
        var minute = this._start.clone();

        for (var i = 0; i < 60; i++) {
            result[i] = new date.Minute(minute.setMinute(i));
        }

        return result;
    };
})(this.mailru_datetime_ns || this)
