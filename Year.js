(function (date) {
    "use strict";

    /**
     * Класс представляет календарный год
     *
     * @class Класс представляет календарный год
     * @augments date.ACalendar
     * @param {String|Date|DateTime|int|null} [initDate]
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Year = function (initDate) {
        this._init(initDate);
    };

    date.Year.prototype = new date.ACalendar();
    date.Year.prototype.constructor = date.Year;


    /**
     * @return {undefined}
     */
    date.Year.prototype._fit = function () {
        this._start = this._date.clone().setMonth(1).setDayOfMonth(1).setTime(0, 0, 0);
        this._end = this._date.clone().setYear(this._start.getYear() + 1).setMonth(1).setDayOfMonth(1).setTime(0, 0, 0);
    };


    /**
     * @return {Number}
     */
    date.Year.prototype.valueOf = function () {
        return this.getYear();
    };


    /**
     * @return {Number}
     */
    date.Year.prototype.getYear = function () {
        return this._start.getYear();
    };


    /**
     * @param {Number}
     * @return {date.Year}
     */
    date.Year.prototype.setYear = function (arg) {
        this._start.setYear(arg);
        this._end.setYear(arg + 1);
        return this;
    };


    /**
     * @param {Number}
     * @return {date.Year}
     */
    date.Year.prototype.toNext = function (n) {
        if (!n) n = 1;
        return this.clone().setYear(this.getYear() + n);
    };

    /**
     * @param {Number}
     * @return {date.Year}
     */
    date.Year.prototype.toPrev = function (n) {
        if (!n) n = 1;
        return this.clone().setYear(this.getYear() - n);
    };
})(this.mailru_datetime_ns || this)
