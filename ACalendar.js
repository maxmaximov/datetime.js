(function (date) {
    "use strict";

    date.ACalendar = function () {
    };

    date.ACalendar.prototype = new date.Interval();
    date.ACalendar.prototype.constructor = date.ACalendar;


    date.ACalendar.prototype._init = function (initDate) {
        this._date;
        this._start;
        this._end;

        if (typeof initDate === "undefined" && arguments.length) {
            //throw new Error("Incorrect date format");
        }

        if (initDate) {
            this._date = new date.DateTime(initDate);
        } else {
            this._date = new date.DateTime();
        }

        this._fit();
    };

    date.ACalendar.prototype._fit = function () {
        throw new Error("Method must be realized");
    };

    date.ACalendar.prototype.toNext = function () {
        throw new Error("Method must be realized");
    };

    date.ACalendar.prototype.toPrev = function () {
        throw new Error("Method must be realized");
    };


    date.ACalendar.prototype.greater = function (arg) {
        return this._start > arg._start;
    };

    date.ACalendar.prototype.greaterOrEqual = function (arg) {
        return this._start >= arg._start;
    };

    date.ACalendar.prototype.less = function (arg) {
        return this._start < arg._start;
    };

    date.ACalendar.prototype.lessOrEqual = function (arg) {
        return this._start <= arg._start;
    };

/*

    //date.Interval

    date.ACalendar.prototype.toYears = function () {
    };

    date.ACalendar.prototype.toMonths = function () {
    };

    date.ACalendar.prototype.toWeeks = function () {
    };

    date.ACalendar.prototype.toDays = function () {
    };

    date.ACalendar.prototype.toHours = function () {
    };

    date.ACalendar.prototype.toMinutes = function () {
    };

    date.ACalendar.prototype.toSeconds = function () {
    };

*/
})(this.mailru_datetime_ns || this)
