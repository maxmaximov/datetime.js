(function (date) {
    "use strict";

    date.Year = function (initDate) {
        this._init(initDate);
    };

    date.Year.prototype = new date.ACalendar();
    date.Year.prototype.constructor = date.Year;


    date.Year.prototype._fit = function () {
        this._start = this._date.clone().setMonth(1).setDayOfMonth(1).setTime(0, 0, 0);
        this._end = this._date.clone().setYear(this._start.getYear() + 1).setMonth(1).setDayOfMonth(1).setTime(0, 0, 0);
    };


    date.Year.prototype.valueOf = function () {
        return this.getYear();
    };


    date.Year.prototype.getYear = function () {
        return this._start.getYear();
    };


    date.Year.prototype.setYear = function (arg) {
        this._start.setYear(arg);
        this._end.setYear(arg + 1);
        return this;
    };


    date.Year.prototype.toNext = function (n) {
        if (!n) n = 1;
        return this.clone().setYear(this.getYear() + n);
    };

    date.Year.prototype.toPrev = function (n) {
        if (!n) n = 1;
        return this.clone().setYear(this.getYear() - n);
    };
})(this.mailru_datetime_ns || this)
