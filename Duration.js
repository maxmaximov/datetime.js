(function (date) {
    "use strict";

    /**
     * Класс для представления длительности в календарных сущностях (часы, дни, месяцы и т.д.)
     *
     * @class Класс для представления длительности в календарных сущностях (часы, дни, месяцы и т.д.)
     * @augments date.ACommon
     * @property {Number} _duration Длительность в виде внутренней структуры
     * @param {date.Duration|date.Interval|Number} arg
     * @throws Error {Error} если тип аргумент не соответсвует ожидаемому (и не приводится к нему)
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.Duration = function () {
        this._duration;

        if (arguments.length < 1) {
            throw new Error("Wrong argument number");
        }

        if (arguments[0] instanceof date.Duration) {
            //this._duration = arguments[0]._duration; – вот так нельзя делать
            throw new Error("Не реализовано, соре!");
        } else if (arguments[0] instanceof date.Interval) {
            this._duration = date.Duration._parseInterval(arguments[0]);
        } else if (arguments.length == 2) {
            this._duration = date.Duration._parseInterval(new date.Interval(arguments[0], arguments[1]));
        } else if (typeof arguments[0] == "string") {
            this._duration = date.Duration._parseIsoString(arguments[0]);
        } else {
            throw new Error("Unsupported argument type");
        }
    };


    date.Duration.prototype = new date.ACommon();
    date.Duration.prototype.constructor = date.Duration;


    //date.Duration.re = /^(-)?P(?:([0-9]+)W)|((?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?)?)$/;
    date.Duration.re = /^(-)?P(?:([0-9]+)Y)?(?:([0-9]+)M)?(?:([0-9]+)D)?(T(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?)?$/;

    /**
     * @param {String}
     * @return {Boolean}
     */
    date.Duration.isParsableAsDuration = function (str) {
        return date.Duration.re.test(str);
    };

    /**
     * @param {String}
     * @return {date.Duration}
     */
    date.Duration._parseInterval = function (interval) {
        var start = interval.toStart();
        var end = interval.toEnd();

        var duration = {
            "years": end.getYear() - start.getYear(),
            "months": end.getMonth() - start.getMonth(),
            "days": end.getDayOfMonth() - start.getDayOfMonth(),
            "hours": end.getHour() - start.getHour(),
            "minutes": end.getMinute() - start.getMinute(),
            "seconds": end.getSecond() - start.getSecond()
        };

        if (duration.seconds < 0) {
            duration.seconds += 60;
            duration.minutes--;
        };

        if (duration.minutes < 0) {
            duration.minutes += 60;
            duration.hours--;
        };

        if (duration.hours < 0) {
            duration.hours += 24;
            duration.days--;
        };

        //duration.minutes++;

        return duration;
    };

    /**
     * @param {String}
     * @return {date.Duration}
     */
    date.Duration._parseIsoString = function (str) {
        var ps = str.match(date.Duration.re);

        if (!(ps && ps[0])) {
            throw new Error("Incorrect duration format");
        };

        var sign = (ps[1] || "").toString() + "1";

        var duration = {
            "years": (parseInt(ps[2]) || 0) * sign,
            "months": (parseInt(ps[3]) || 0) * sign,
            "days": (parseInt(ps[4]) || 0) * sign,
            "hours": (parseInt(ps[6]) || 0) * sign,
            "minutes": (parseInt(ps[7]) || 0) * sign,
            "seconds": (parseInt(ps[8]) || 0) * sign
        }

        return duration;
    };

    /**
     * @param {date.DateTime} arg
     * @param {date.Duration|date.Interval|String} diff
     * @return {date.DateTime}
     */
    date.Duration.addToDate = function (arg, diff) {
        var duration;

        if (!arg instanceof date.DateTime) {
            throw new Error("Unsupported argument type");
        }

        if (diff instanceof date.Duration) {
            duration = diff;
        } else if (diff instanceof date.Interval) {
            duration = diff.toDuration();
        } else {
            duration = new date.Duration(diff);
        }

        return arg.clone().
            setTime(arg.getHour() + duration.getHours(), arg.getMinute() + duration.getMinutes(), arg.getSecond() + duration.getSeconds(), 0).
            setYear(arg.getYear() + duration.getYears()).
            setMonth(arg.getMonth() + duration.getMonths()).
            setDayOfMonth(arg.getDayOfMonth() + duration.getDays());
    };


    /**
     * @return {undefined}
     */
    date.Duration.prototype.valueOf = function () {
        //return this._duration;
    };

    /**
     * @return {undefined}
     */
    date.Duration.prototype.toString = function () {
        //return this._duration;

        /*var duration = this._duration;
        var result = "P";

        if (duration.weeks) {
            result += duration.weeks + "W";
        } else {
            result += duration.years != 0 ? duration.years + "Y" : "";
            result += duration.months != 0 ? duration.months + "M" : "";
            result += duration.days != 0 ? duration.days + "D" : "";

            if (duration.hours || duration.minutes || duration.seconds) {
                result += "T";
                result += duration.hours != 0 ? duration.hours + "H" : "";
                result += duration.minutes != 0 ? duration.minutes + "M" : "";
                result += duration.seconds != 0 ? duration.seconds + "S" : "";
            }
        }

        return result;*/
    };


    /**
     * @return {Number}
     */
    date.Duration.prototype.getYears = function () {
        return this._duration.years;
    };

    /**
     * @return {Number}
     */
    date.Duration.prototype.getMonths = function () {
        return this._duration.months;
    };

    /**
     * @return {Number}
     */
    date.Duration.prototype.getDays = function () {
        return this._duration.days;
    };

    /**
     * @return {Number}
     */
    date.Duration.prototype.getHours = function () {
        return this._duration.hours;
    };

    /**
     * @return {Number}
     */
    date.Duration.prototype.getMinutes = function () {
        return this._duration.minutes;
    };

    /**
     * @return {Number}
     */
    date.Duration.prototype.getSeconds = function () {
        return this._duration.seconds;
    };

    /**
     * @return {Number}
     */
    date.Duration.prototype.getMaxUnit = function () {
        var units = [
            this.getYears(),
            this.getMonths(),
            this.getDays(),
            this.getHours(),
            this.getMinutes(),
            this.getSeconds()
        ];

        var unit;

        while (unit = units.pop()) {
            if (unit > 0) {
                return unit;
            };
        }

    };
})(this.mailru_datetime_ns || this)
