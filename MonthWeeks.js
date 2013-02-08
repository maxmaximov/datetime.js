(function (date) {
    "use strict";

    /**
     * Класс представляет недели месяца
     *
     * @class Класс представляет недели месяца
     * @augments date.ACalendar
     * @param {date.Month|String|Date|DateTime|int|null} [initDate]
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.MonthWeeks = function (initDate) {
        if (initDate instanceof date.Month) {
            this._init(initDate.clone());
        } else {
            this._init(new date.Month(initDate));
        }
    };

    date.MonthWeeks.prototype = new date.ACalendar();
    date.MonthWeeks.prototype.constructor = date.MonthWeeks;


    /**
     * @constructor
     */
    date.MonthWeeks.prototype._init = function (month) {
        this._month = month;
        this._fit();
    };

    /**
     * @return {undefined}
     */
    date.MonthWeeks.prototype._fit = function () {
        this._start = this._month.toStart().toWeek().toStart();
        this._end = this._month.toEnd().toWeek().toEnd();
    };


    /**
     * @return {Number}
     */
    date.MonthWeeks.prototype.valueOf = function () {
        return this._month.valueOf();
    };


    /**
     * @param {Number} n
     * @return {date.MonthWeeks}
     */
    date.MonthWeeks.prototype.toNext = function (n) {
        if (!n) n = 1;
        return new date.MonthWeeks(this._month.toNext(n));
    };

    /**
     * @param {Number} n
     * @return {date.MonthWeeks}
     */
    date.MonthWeeks.prototype.toPrev = function (n) {
        if (!n) n = 1;
        return new date.MonthWeeks(this._month.toPrev(n));
    };


    /*date.MonthWeeks.prototype.toDay = function (n) {
        var day = new date.Day((new date.DateTime(this._start)).setDayOfMonth(n));
        if (this.includes(day)) {
            return day;
        }
    };

    date.MonthWeeks.prototype.toDays = function () {
        var result = [], day = this._start.clone(), end = this._end.clone();
        end._date.setDate(0);

        for (var i = 0, l = end.getDayOfMonth(); i < l; i++) {
            result[i] = new date.Day(day.setDayOfMonth(i + 1));
        }

        return result;
    };*/
})(this.mailru_datetime_ns || this)
