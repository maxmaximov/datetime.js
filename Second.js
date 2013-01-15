(function (date) {
    "use strict";

    date.Second = function (initDate) {
        this._init(initDate);
    };

    date.Second.prototype = new date.Hour();
    date.Second.prototype.constructor = date.Second;


    date.Second.prototype._fit = function () {
        this._start = this._date.clone();
        this._end = this._date.clone().setSecond(this._start.getSecond() + 1);
    };


    date.Second.prototype.valueOf = function () {
        return this.getSecond();
    };


    date.Second.prototype.getSecond = function () {
        return this._start.getSecond();
    };


    date.Second.prototype.getSecond = function (arg) {
        return this._start.setSecond(arg);
    };


    date.Second.prototype.toNext = function () {
        return this.clone().setSecond(this.getSecond() + 1);
    };

    date.Second.prototype.toPrev = function () {
        return this.clone().setSecond(this.getSecond() - 1);
    };


    date.Second.prototype.toHour = function () {
        return new date.Hour(this._start);
    };
})(this.mailru_datetime_ns || this)
