(function (date) {
    "use strict";

    /**
     * Класс представляет календарную минуту
     *
     * @class Класс представляет календарную минуту
     * @augments date.Hour
     * @param {String|Date|DateTime|int|null} [initDate]
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Minute = function (initDate) {
        this._init(initDate);
    };

    date.Minute.prototype = new date.Hour();
    date.Minute.prototype.constructor = date.Minute;


    /**
     * @return {undefined}
     */
    date.Minute.prototype._fit = function () {
        this._start = this._date.clone().setSecond(0);
        this._end = this._date.clone().setMinute(this._start.getMinute() + 1).setSecond(0);
    };


    /**
     * @return {Number}
     */
    date.Minute.prototype.valueOf = function () {
        return this.getMinute();
    };


    /**
     * @return {Number}
     */
    date.Minute.prototype.getMinute = function () {
        return this._start.Minute();
    };


    /**
     * @param {Number} arg
     * @return {date.Minute}
     */
    date.Minute.prototype.setMinute = function (arg) {
        return this._start.setMinute(arg);
    };


    /**
     * @return {date.Minute}
     */
    date.Minute.prototype.toNext = function () {
        return this.clone().setMinute(this.getMinute() + 1);
    };

    /**
     * @return {date.Minute}
     */
    date.Minute.prototype.toPrev = function () {
        return this.clone().setMinute(this.getMinute() - 1);
    };


    /**
     * @return {date.Hour}
     */
    date.Minute.prototype.toHour = function () {
        return new date.Hour(this._start);
    };
})(this.mailru_datetime_ns || this)
