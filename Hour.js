(function (date) {
    "use strict";

    date.Hour = function (initDate) {
        this._init(initDate);
    };

    date.Hour.prototype = new date.Day();
    date.Hour.prototype.constructor = date.Hour;


    date.Hour.prototype._fit = function () {
        this._start = this._date.clone().setMinute(0).setSecond(0);
        this._end = this._date.clone().setHour(this._start.getHour() + 1).setMinute(0).setSecond(0);
    };


    date.Hour.prototype.valueOf = function () {
        return this.getHour();
    };


    date.Hour.prototype.getHour = function () {
        return this._start.getHour();
    };


    date.Hour.prototype.setHour = function (arg) {
        this._start.setHour(arg);
        this._end.setHour(arg + 1);

        return this;
    };


    date.Hour.prototype.toNext = function () {
        var clone = this.clone();
        clone._start = clone._start.addPeriod(60 * 60 * 1000);
        clone._end = clone._end.addPeriod(60 * 60 * 1000);

        return clone;
    };

    date.Hour.prototype.toPrev = function () {
        var clone = this.clone();
        clone._start = clone._start.addPeriod(-60 * 60 * 1000);
        clone._end = clone._end.addPeriod(-60 * 60 * 1000);

        return clone;
    };


    date.Hour.prototype.toDay = function () {
        return new date.Day(this._start);
    };
})(this.mailru_datetime_ns || this)
