(function (date) {
    "use strict";

    date.Minute = function (initDate) {
        this._init(initDate);
    };

    date.Minute.prototype = new date.Hour();
    date.Minute.prototype.constructor = date.Minute;


    date.Minute.prototype._fit = function () {
        this._start = this._date.clone().setSecond(0);
        this._end = this._date.clone().setMinute(this._start.getMinute() + 1).setSecond(0);
    };


    date.Minute.prototype.valueOf = function () {
        return this.getMinute();
    };


    date.Minute.prototype.getMinute = function () {
        return this._start.Minute();
    };


    date.Minute.prototype.getMinute = function (arg) {
        return this._start.setMinute(arg);
    };


    date.Minute.prototype.toNext = function () {
        return this.clone().setMinute(this.getMinute() + 1);
    };

    date.Minute.prototype.toPrev = function () {
        return this.clone().setMinute(this.getMinute() - 1);
    };


    date.Minute.prototype.toHour = function () {
        return new date.Hour(this._start);
    };
})(this.mailru_datetime_ns || this)
