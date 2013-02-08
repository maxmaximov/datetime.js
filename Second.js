(function (date) {
    "use strict";

    /**
     * Класс представляет календарную секунду
     *
     * @class Класс представляет календарную секунду
     * @augments date.Minute
     * @param {String|Date|DateTime|int|null} [initDate]
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Second = function (initDate) {
        this._init(initDate);
    };

    date.Second.prototype = new date.Hour();
    date.Second.prototype.constructor = date.Second;


    /**
     * @return {undefined}
     */
    date.Second.prototype._fit = function () {
        this._start = this._date.clone();
        this._end = this._date.clone().setSecond(this._start.getSecond() + 1);
    };


    /**
     * @return {Number}
     */
    date.Second.prototype.valueOf = function () {
        return this.getSecond();
    };


    /**
     * @return {Number}
     */
    date.Second.prototype.getSecond = function () {
        return this._start.getSecond();
    };


    /**
     * @param {Number} arg
     * @return {date.Second}
     */
    date.Second.prototype.setSecond = function (arg) {
        return this._start.setSecond(arg);
    };


    /**
     * @return {date.Second}
     */
    date.Second.prototype.toNext = function () {
        return this.clone().setSecond(this.getSecond() + 1);
    };

    /**
     * @return {date.Second}
     */
    date.Second.prototype.toPrev = function () {
        return this.clone().setSecond(this.getSecond() - 1);
    };
})(this.mailru_datetime_ns || this)
