(function (date) {
    "use strict";

    date.Day = function (initDate) {
        this._init(initDate);
    };

    date.Day.prototype = new date.Month();
    date.Day.prototype.constructor = date.Day;


    date.Day.prototype._fit = function () {
        this._start = this._date.clone().setTime(0, 0, 0);
        this._end = this._date.clone().setDayOfMonth(this._start.getDayOfMonth() + 1).setTime(0, 0, 0);
    };


    date.Day.prototype.valueOf = function () {
        return this.getDay();
    };


    date.Day.prototype.getDay = function() {
        return this.getDayOfMonth();
    };

    date.Day.prototype.getDayOfMonth = function() {
        return this._start.getDayOfMonth();
    };

    date.Day.prototype.getDayOfWeek = function() {
        return this._start.getDayOfWeek();
    };

    date.Day.prototype.getWeek = function () {
        return this._start.getWeek();
    };


    date.Day.prototype.setDay = function (arg) {
        return this.setDayOfMonth(arg);
    };

    date.Day.prototype.setDayOfMonth = function (arg) {
        this._start.setDayOfMonth(arg);
        this._end = this._start.add("P1D");
        return this;
    };

    date.Day.prototype.setDayOfWeek = function (arg) {
        this._start.setDayOfWeek(arg);
        this._end = this._start.add("P1D");
        return this;
    };


    date.Day.prototype.toNext = function (n) {
        if (!n) n = 1;
        return this.clone().setDay(this.getDay() + n);
    };

    date.Day.prototype.toPrev = function (n) {
        if (!n) n = 1;
        return this.clone().setDay(this.getDay() - n);
    };


    date.Day.prototype.toMonth = function () {
        return new date.Month(this._start);
    };

    date.Day.prototype.toWeek = function () {
        return new date.Week(this._start);
    };


    date.Day.prototype.isWeekend = function () {
        return this._start.getDayOfWeek() == 6 || this._start.getDayOfWeek() == 7;
    };


    date.Day.prototype.toHours = function () {
        var result = [], hour = this._start.clone();

        for (var i = 0; i < 24; i++) {
            result[i] = new date.Hour(hour.setHour(i));
        }

        return result;
    };
})(this.mailru_datetime_ns || this)
