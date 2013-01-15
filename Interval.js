(function (date) {
    "use strict";

    date.Interval = function (start, end) {
        this._start;
        this._end;

        if (arguments[0] instanceof date.Interval) {
            this._start = arguments[0].toStart();
            this._end = arguments[0].toEnd();
        } else {
            if (start instanceof date.DateTime) {
                this._start = start;
            } else {
                if (typeof start == "undefined") {
                    this._start = new date.DateTime(4294967295);
                } else {
                    this._start = new date.DateTime(start);
                }
            }

            if (end instanceof date.DateTime) {
                this._end = end;
            } else {
                if (typeof end == "undefined") {
                    this._end = new date.DateTime(0);
                } else {
                    this._end = new date.DateTime(end);
                }
            }
        }
    }


    date.Interval.prototype = new date.ACommon();
    date.Interval.prototype.constructor = date.Interval;


    date.Interval.prototype.valueOf = function () {
        return this.toPeriod().valueOf();
    }

    date.Interval.prototype.toString = function (format) {
        if (format) {
            return this._start.format(format) + " - "  + this._end.format(format);
        } else {
            return this._start.toString() + " - "  + this._end.toString();
        }
    }


    date.Interval.prototype.toStart = function () {
        return this._start.clone();
    }

    date.Interval.prototype.toEnd = function () {
        return this._end.clone();
    }


    /*date.Interval.prototype.getWeeks = function () {
        return this.toPeriod().getWeeks();
    }

    date.Interval.prototype.getDays = function () {
        return this.toPeriod().getDays();
    }

    date.Interval.prototype.getHours = function () {
        return this.toPeriod().getHours();
    }

    date.Interval.prototype.getMinutes = function () {
        return this.toPeriod().getMinutes();
    }

    date.Interval.prototype.getSeconds = function () {
        return this.toPeriod().getSeconds();
    }*/


    date.Interval.prototype.toPeriod = function () {
        return new date.Period(this._end - this._start);
    }

    date.Interval.prototype.toDuration = function () {
        return new date.Duration(this);
    }


    date.Interval.prototype.equals = function (arg) {
        if (arg instanceof date.Interval) {
            return this.toStart().valueOf() == arg.toStart().valueOf() && this.toEnd().valueOf() == arg.toEnd().valueOf();
        } else {
            throw new Error("Incorrect argument");
        }
    }

    date.Interval.prototype.includes = function (arg) {
        if (arg instanceof date.DateTime) {
            return this.toStart().valueOf() <= arg.valueOf() && this.toEnd().valueOf() > arg.valueOf();
        } else if (arg instanceof date.Interval) {
            return this.toStart().valueOf() <= arg.toStart().valueOf() && this.toEnd().valueOf() >= arg.toEnd().valueOf();
        } else {
            throw new Error("Incorrect argument");
        }
    }

    date.Interval.prototype.intersects = function (arg) {
        var a1 = this._start.valueOf(),
            a2 = arg._start.valueOf(),
            b1 = this._end.valueOf(),
            b2 = arg._end.valueOf();

        return (a1 <= a2 && b1 > a2) || (a1 < b2 && b1 >= b2) || (a1 < a2 && b1 >= b2) || (a1 > a2 && b1 <= b2);
    }


    date.Interval.prototype.union = function (arg) {
        var start, end;

        if (this.toStart() > arg.toStart()) {
            start = arg.toStart();
        } else {
            start = this.toStart();
        }

        if (this.toEnd().valueOf() < arg.toEnd().valueOf()) {
            end = arg.toEnd();
        } else {
            end = this.toEnd();
        }

        return new date.Interval(start, end);
    }


    date.Interval.prototype.toIntersectsDays = function () {
        var days = [];
        var currentDay = this._start.toDay();

        while (this.intersects(currentDay)) {
            days.push(currentDay);
            currentDay = currentDay.toNext();
        }

        return days;
    }

    date.Interval.prototype.toIncludesDays = function () {
        var days = [];
        var currentDay = this._start.toDay();
        var lastDay = this._end.toDay();

        while (!currentDay.equals(lastDay)) {
            if (this.includes(currentDay)) days.push(currentDay);
            currentDay = currentDay.toNext();
        }

        return days;
    }
})(this.mailru_datetime_ns || this)
