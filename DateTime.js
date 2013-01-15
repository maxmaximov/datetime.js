;(function (date) {
    "use strict";
    /**
     * Имплементация стандартного объекта Date
     *
     * @constructor
     * @memberof date
     * @param {string|Date|DateTime|int|null} initDate начальная дата
     * @throws Error {Error} если параметр не смог распарситься встроенным Date
     *
     * @return {string} строковое представление текущего времени, e.g. "Wed Apr 04 2012 18:19:07 GMT+0400 (MSK)"
     */
    date.DateTime = function(initDate) {
        if (arguments.length) {
            if (typeof initDate === "undefined") {
                throw new Error("Incorrect date format");
            }

            if (initDate instanceof date.DateTime) {
                this._date = new Date(initDate._date);
                this._format = initDate._format;
            } else if (initDate instanceof date.ACalendar) {
                this._date = new Date(initDate._start);
            } else if (initDate instanceof date.Interval) {
                throw new Error("date.Interval can't cast to date.DateTime");
            } else if (!isNaN(initDate)) {
                this._date = new Date(initDate);
            } else {
                for (var i = 0, l = date.DateTime.formats.length; i < l; i++) {
                    if (date.DateTime.formats[i]["re"].test(initDate)) {
                        this._format = date.DateTime.formats[i];

                        if (this._format["pattern"]) {
                            this._date = new Date(initDate.replace(this._format["re"], this._format["pattern"]));
                        } else {
                            this._date = new Date(initDate);
                        }

                        break;
                    }
                }

                if (!this._date) this._date = new Date(initDate);
            }
        } else {
            this._date = new Date();
        }

        if (isNaN(this._date.valueOf())) {
            throw new Error("Incorrect date format");
        }

        if (!this._format) this._format = date.DateTime.formats[0];

        this._date.setMilliseconds(0);
    };


    date.DateTime.prototype = new date.ACommon();
    date.DateTime.prototype.constructor = date.DateTime;


    // http://my.safaribooksonline.com/book/programming/regular-expressions/9780596802837/validation-and-formatting/validate_iso_8601_dates_and_times
    date.DateTime.ISO = {};

    // 2008-08
    date.DateTime.ISO["YYYY-MM"] = /^([0-9]{4})-(1[0-2]|0[1-9])$/;

    // 2008-08-30
    date.DateTime.ISO["YYYY-MM-DD"] = /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[0-1]|0[1-9]|[1-2][0-9])$/;

    // 2008-08-30+07:00
    date.DateTime.ISO["YYYY-MM-DDZ"] = /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[0-1]|0[1-9]|[1-2][0-9])(Z|[+-](?:2[0-3]|[0-1][0-9]):[0-5][0-9])$/;

    // 2008-08-30T01:45:36 or 2008-08-30T01:45:36.123
    date.DateTime.ISO["YYYY-MM-DDThh:mm:ss"] = /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[0-1][0-9]):?([0-5][0-9]):?([0-5][0-9])(\.[0-9]+)?$/;

    // 2008-08-30T01:45:36+07:00 or 2008-08-30T01:45:36.123+07:00
    date.DateTime.ISO["YYYY-MM-DDThh:mm:ssZ"] = /^([0-9]{4})-?(1[0-2]|0[1-9])-?(3[0-1]|0[1-9]|[1-2][0-9])T(2[0-3]|[0-1][0-9]):?([0-5][0-9]):?([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[0-1][0-9]):[0-5][0-9])$/;

    date.DateTime.formats = [
        {
            "re": date.DateTime.ISO["YYYY-MM-DDThh:mm:ssZ"],
            "format": "%Y-%m-%dT%T%z",
            "floating": false
        },
        {
            "re": date.DateTime.ISO["YYYY-MM-DDThh:mm:ss"],
            "format": "%Y-%m-%dT%T",
            "pattern": "$1-$2-$3T$4:$5:$6" + CURRENT_USER.timezone.offset_str,
            "floating": true
        },
        {
            "re": date.DateTime.ISO["YYYY-MM-DDZ"],
            "format": "%Y-%m-%d%z",
            "pattern": "$1-$2-$3T00:00:00$4",
            "floating": false
        },
        {
            "re": date.DateTime.ISO["YYYY-MM-DD"],
            "format": "%Y-%m-%d",
            "pattern": "$1-$2-$3T00:00:00" + CURRENT_USER.timezone.offset_str,
            "floating": true
        }
    ];


    /**
     * TODO добавить описание метода
     *
     * @param {string} str TODO добавить описание аргумента
     * @return {boolean} TODO добавить описание возвращаемого значения
     */
    date.DateTime.isParsableAsDateTime = function (str) {
        return str.toString() !== "" && !isNaN((new Date(str)).valueOf());
    }


    /**
     * Получить таймстамп
     *
     * @override
     * @return {number} таймстамп
     */
    date.DateTime.prototype.valueOf = function() {
        //return Math.floor(this._date.valueOf() / 1000);
        return this._date.valueOf();
    };

    /**
     * TODO добавить описание метода
     *

     * @override
     * @return {string} текстовое представление объекта e.g. "Wed Apr 04 2012 18:19:07 GMT+0400 (MSK)"
     */
    date.DateTime.prototype.toString = function(format) {
        if (format) {
            return this.format(format);
        } else {
            return this._date.toString();
        }
    };

    /**
     * TODO добавить описание метода
     *

     * @override
     * @return {string} текстовое представление объекта в ISO-формате e.g. "2012-07-13T17:42:51+04:00"
     */
    date.DateTime.prototype.toISOString = function() {
        return this.format(this._format["format"]).replace(/([+-]\d\d)(\d\d)/, "$1:$2");
    };


    /**
     * TODO добавить описание метода
     *
     *
     * @return {boolean} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.isFloating = function() {
        return this._format["floating"];
    };


    /**
     * TODO добавить описание метода
     *
     *
     * @return {number} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getYear = function() {
        return this._date.getFullYear();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {number} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getMonth = function() {
        return this._date.getMonth() + 1;
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {number} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getWeek = function() {
        var nearestThursdayStart = this.clone().setTime(0, 0, 0).setDayOfMonth(this.getDayOfMonth() + 4 - this.getDayOfWeek());
        var yearStart = nearestThursdayStart.clone().setMonth(1).setDayOfMonth(1);
        return Math.ceil((((nearestThursdayStart - yearStart) / 86400000) + 1) / 7);
    }

    /**
     * TODO добавить описание метода
     *
     *
     * @return {number} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getDayOfYear = function() {
        return Math.ceil((this._date - new Date(this._date.getFullYear(), 0, 1)) / 1000 / 60 / 60 / 24);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {number} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getDayOfMonth = function() {
        return this._date.getDate();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getDayOfWeek = function() {
        return this._date.getDay() == 0 ? 7 : this._date.getDay();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {number} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getHour = function() {
        return this._date.getHours();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {number} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getMinute = function() {
        return this._date.getMinutes();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {number} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.getSecond = function() {
        return this._date.getSeconds();
    };


    /**
     * TODO добавить описание метода
     * @param {number} arg год
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setYear = function(arg) {
        this._date.setFullYear(arg);
        return this;
    };

    /**
     * TODO добавить описание метода
     * @param {number} arg номер месяца
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setMonth = function(arg) {
        if (arg instanceof date.Month) {
            var start = arg.toStart();
            this.setYear(start.getYear()).setMonth(start.getMonth());
        } else {
            this._date.setMonth(arg - 1);
        }

        return this;
    };

    /**
     * TODO добавить описание метода
     * @param {number} arg номер недели
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setWeek = function(arg) {
        if (arg instanceof date.Week) {
            var start = arg.toStart();
            this.setYear(start.getYear()).setMonth(start.getMonth()).setDayOfMonth(start.getDayOfMonth()).setDayOfWeek(start.getDayOfWeek());
        } else {
            this.setDayOfMonth(this.getDayOfMonth() + (arg - this.getWeek()) * 7);
        }

        return this;
    };

    /**
     * TODO добавить описание метода
     * @param {number} arg число в месяце
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setDayOfMonth = function(arg) {
        this._date.setDate(arg);
        return this;
    };

    /**
     * TODO добавить описание метода
     * @param {number} arg день недели
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setDayOfWeek = function(arg) {
        this.setDayOfMonth(this.getDayOfMonth() - this.getDayOfWeek() + arg);
        return this;
    };

    /**
     * TODO добавить описание метода
     * @param {number} arg день недели
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setDay = function(arg) {
        if (!(arg instanceof date.Day)) {
            throw new Error("Incorrect argument format");
        };

        var result = arg.toStart();
        result.setHour(this.getHour()).setMinute(this.getMinute()).setSecond(this.getSecond());

        this._date = result._date;

        return this;
    };

    /**
     * Установить время
     *
     * @param {number} hours часы
     * @param {number} minutes минуты
     * @param {number} seconds секунды
     * @return {DateTime}
     */
    date.DateTime.prototype.setTime = function(hours, minutes, seconds) {
        var args = Array.prototype.slice.call(arguments);
        if (args.length > 3) args[3] = 0;
        Date.prototype.setHours.apply(this._date, args);
        return this;
    };

    /**
     * Установить часы
     *
     * @param {number} arg часы
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setHour = function(arg) {
        this._date.setHours(arg);
        return this;
    };

    /**
     * Установить минуты
     * @param {number} arg минуты
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setMinute = function(arg) {
        this._date.setMinutes(arg);
        return this;
    };

    /**
     * Установить секунды
     * @param {number} arg секунды
     *
     * @return {DateTime}
     */
    date.DateTime.prototype.setSecond = function(arg) {
        this._date.setSeconds(arg);
        return this;
    };


    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toYear = function() {
        return new date.Year(this);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toMonth = function() {
        return new date.Month(this);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toWeek = function() {
        return new date.Week(this);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toDay = function() {
        return new date.Day(this);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toStartOfYear = function() {
        return this.toYear().toStart();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toEndOfYear = function() {
        return this.toYear().toEnd();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toStartOfMonth = function() {
        return this.toMonth().toStart();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toEndOfMonth = function() {
        return this.toMonth().toEnd();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toStartOfWeek = function() {
        return this.toWeek().toStart();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toEndOfWeek = function() {
        return this.toWeek().toEnd();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toStartOfDay = function() {
        return this.toDay().toStart();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.toEndOfDay = function() {
        return this.toDay().toEnd();
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.diff = function(otherDate) {
        return new date.Interval(this, otherDate);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.add = function(diff) {
        if (diff instanceof date.Period || date.Period.isParsableAsPeriod(diff)) {
            return this.addPeriod(diff);
        } else if (diff instanceof date.Duration || date.Duration.isParsableAsDuration(diff)) {
            return this.addDuration(diff);
        } else {
            throw new Error("Unsupported argument type");
        }
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.addPeriod = function(period) {
        return date.Period.addToDate(this, period);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.addDuration = function(duration) {
        return date.Duration.addToDate(this, duration);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.subtract = function(diff) {
        if (diff instanceof date.Period || date.Period.isParsableAsPeriod(diff)) {
            return this.subtractPeriod(diff);
        } else if (diff instanceof date.Duration || date.Duration.isParsableAsDuration(diff)) {
            return this.subtractDuration(diff);
        } else {
            throw new Error("Unsupported argument type");
        }
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.subtractPeriod = function(period) {
        return date.Period.subtractFromDate(this, period);
    };

    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.subtractDuration = function(duration) {
        return date.Duration.subtractFromDate(this, duration);
    };


    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.equals = function(arg) {
        return this.valueOf() === arg.valueOf();
    };


    /**
     * TODO добавить описание метода
     *
     *
     * @return {TODO добавить тип возвращаемого значения} TODO добавить описание возвращаемого значения
     */
    date.DateTime.prototype.format = function(fmt) {
        if (!(this.locale in date.DateTime.ext.locales)) {
            if (this.locale.replace(/-[a-zA-Z]+$/, "") in date.DateTime.ext.locales) {
                this.locale = this.locale.replace(/-[a-zA-Z]+$/, "");
            } else {
                this.locale = "ru-RU";
            }
        }

        var d = this;

        while (fmt.match(/%[cDnrRtTxXzZ]/)) {
            fmt = fmt.replace(/%([cDhnrRtTxXzZ])/g, function(m0, m1) {
                var f = date.DateTime.ext.aggregates[m1];
                return (f == "locale" ? date.DateTime.ext.locales[d.locale][m1] : f);
            });
        }

        var str = fmt.replace(/%([aAbBCdegGHhIjmMpPSuUVwWyYL%])/g, function(m0, m1) {
            var f = date.DateTime.ext.formats[m1];
            if (typeof f == "string") {
                return d._date[f]();
            } else if (typeof f == "function") {
                return f.call(d, d);
            } else if (typeof f == "object" && typeof f[0] == "string") {
                return date.DateTime.ext.util.xPad(d._date[f[0]](), f[1]);
            } else {
                return m1;
            }
        });

        d = null;

        return str;
    };


    date.DateTime.ext = {};
    date.DateTime.ext.util = {};

    date.DateTime.ext.util.xPad = function(x, pad, r) {
        if (typeof r == "undefined") {
            r = 10;
        }

        for (; parseInt(x, 10) < r && r > 1; r /= 10) {
            x = pad.toString() + x;
        }

        return x.toString();
    };

    /**
     * @property {String} locale Текущая локаль
     * @type String
     */
    date.DateTime.prototype.locale = "ru-RU";/*(function(){
        var locale = "en_GB",
            navigator = navigator || false,
            process = process || false;

        if (navigator) {
            if (navigator.language) {
                locale = navigator.language;
            }
            else if (navigator.browserLanguage) {
                locale = navigator.browserLanguage;
            }
            else if (navigator.systemLanguage) {
                locale = navigator.systemLanguage;
            }
            else if (navigator.userLanguage) {
                locale = navigator.userLanguage;
            }
        } else if (process && process.env) {
            locale = process.env.LANG;
        };
        if (locale.indexOf("-") !== -1) {
            locale = locale.replace("-", "_");
        } else if (locale.length == 2) {
            locale = locale.toLowerCase() + "_" + locale.toUpperCase();
        }
        return locale;
    })()*/;

    date.DateTime.ext.locales = {};

    date.DateTime.ext.locales.en = {
        a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        A: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        b: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        B: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        c: "%a %d %b %Y %T %Z",
        p: ["AM", "PM"],
        P: ["am", "pm"],
        x: "%d/%m/%y",
        X: "%T"
    };

    date.DateTime.ext.locales.ru = {
        a: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        A: [
            "Воскресенье",
            "Понедельник",
            "Вторник",
            "Среда",
            "Четверг",
            "Пятница",
            "Суббота"
        ],
        b: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        B: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
        L: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
        c: "%a %d %b %Y",
        p: ["", ""],
        P: ["", ""],
        x: "%m.%d.%y",
        X: "%T"
    };

    date.DateTime.ext.locales["en-US"] = date.DateTime.ext.locales.en;
    date.DateTime.ext.locales["en-US"].c = "%a %d %b %Y %r %Z";
    date.DateTime.ext.locales["en-US"].x = "%D";
    date.DateTime.ext.locales["en-US"].X = "%r";

    date.DateTime.ext.locales["ru-RU"] = date.DateTime.ext.locales.ru;
    date.DateTime.ext.locales["ru-RU"].c = "%Y-%m-%dT%H:%M:%S%p+04:00";
    date.DateTime.ext.locales["ru-RU"].x = "%D";
    date.DateTime.ext.locales["ru-RU"].X = "%r";

    date.DateTime.ext.formats = {
        a: function(d) {
            return date.DateTime.ext.locales[d.locale].a[d._date.getDay()];
        },
        A: function(d) {
            return date.DateTime.ext.locales[d.locale].A[d._date.getDay()];
        },
        b: function(d) {
            return date.DateTime.ext.locales[d.locale].b[d._date.getMonth()];
        },
        B: function(d) {
            return date.DateTime.ext.locales[d.locale].B[d._date.getMonth()];
        },
        c: "toLocaleString",
        C: function(d) {
            return date.DateTime.ext.util.xPad(parseInt(d._date.getFullYear() / 100, 10), 0);
        },
        d: ["getDate", "0"],
        e: ["getDate", ""],
        g: function(d) {
            return date.DateTime.ext.util.xPad(parseInt(date.DateTime.ext.util.G(d) / 100, 10), 0);
        },
        G: function(d) {
            var y = d._date.getFullYear();
            var V = parseInt(date.DateTime.ext.formats.V(d), 10);
            var W = parseInt(date.DateTime.ext.formats.W(d), 10);
            if (W > V) {
                y++;
            } else if (W === 0 && V >= 52) {
                y--;
            }
            return y;
        },
        H: ["getHours", "0"],
        h: ["getHours", ""],
        I: function(d) {
            var I = d._date.getHours() % 12;
            return date.DateTime.ext.util.xPad(I === 0 ? 12 : I, 0);
        },
        j: function(d) {
            var ms = d - new date.DateTime("" + d._date.getFullYear() + "/1/1 GMT");
            ms += d._date.getTimezoneOffset() * 60000;
            var doy = parseInt(ms / 60000 / 60 / 24, 10) + 1;
            return date.DateTime.ext.util.xPad(doy, 0, 100);
        },
        m: function(d) {
            return date.DateTime.ext.util.xPad(d._date.getMonth() + 1, 0);
        },
        M: ["getMinutes", "0"],
        p: function(d) {
            return date.DateTime.ext.locales[d.locale].p[d._date.getHours() >= 12 ? 1 : 0];
        },
        P: function(d) {
            return date.DateTime.ext.locales[d.locale].P[d._date.getHours() >= 12 ? 1 : 0];
        },
        S: ["getSeconds", "0"],
        u: function(d) {
            var dow = d._date.getDay();
            return dow === 0 ? 7 : dow;
        },
        U: function(d) {
            var doy = parseInt(date.DateTime.ext.formats.j(d), 10);
            var rdow = 6 - d._date.getDay();
            var woy = parseInt((doy + rdow) / 7, 10);
            return date.DateTime.ext.util.xPad(woy, 0);
        },
        V: function(d) {
            var woy = parseInt(date.DateTime.ext.formats.W(d), 10);
            var dow1_1 = (new date.DateTime("" + d._date.getFullYear() + "/1/1"))._date.getDay();
            var idow = woy + (dow1_1 > 4 || dow1_1 <= 1 ? 0 : 1);
            if (idow == 53 && (new date.DateTime("" + d._date.getFullYear() + "/12/31"))._date.getDay() < 4) {
                idow = 1;
            }
            else if (idow === 0) {
                idow = date.DateTime.ext.formats.V(new date.DateTime("" + (d._date.getFullYear() - 1) + "/12/31"));
            }
            return date.DateTime.ext.util.xPad(idow, 0);
        },
        w: "getDay",
        W: function(d) {
            var doy = parseInt(date.DateTime.ext.formats.j(d), 10);
            var rdow = 7 - date.DateTime.ext.formats.u(d);
            var woy = parseInt((doy + rdow) / 7, 10);
            return date.DateTime.ext.util.xPad(woy, 0, 10);
        },
        y: function(d) {
            return date.DateTime.ext.util.xPad(d._date.getFullYear() % 100, 0);
        },
        Y: "getFullYear",
        z: function(d) {
            var o = d._date.getTimezoneOffset();
            var H = date.DateTime.ext.util.xPad(parseInt(Math.abs(o / 60), 10), 0);
            var M = date.DateTime.ext.util.xPad(o % 60, 0);
            return (o > 0 ? "-" : "+") + H + M;
        },
        Z: function(d) {
            return d.toString().replace(/^.*\(([^)]+)\)$/, "$1");
        },
        L: function(d) {
            if (date.DateTime.ext.locales[d.locale].L) {
                return date.DateTime.ext.locales[d.locale].L[d._date.getMonth()];
            }
            return date.DateTime.ext.locales[d.locale].B[d._date.getMonth()];
        },
        "%": function(d) {
            return "%";
        }
    };

    date.DateTime.ext.aggregates = {
        c: "locale",
        D: "%m/%d/%y",
        F: "%Y-%m-%d",
        n: "\n",
        r: "%H:%M:%S%p",
        R: "%H:%M",
        t: "\t",
        T: "%H:%M:%S",
        x: "locale",
        X: "locale"
    };

    date.DateTime.ext.aggregates.z = date.DateTime.ext.formats.z(new date.DateTime());
    date.DateTime.ext.aggregates.Z = date.DateTime.ext.formats.Z(new date.DateTime());

    date.DateTime.ext.unsupported = {};

})(this.mailru_datetime_ns || this);
