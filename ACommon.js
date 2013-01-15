(function (date) {
    "use strict";

    date.ACommon = function () {
    };

    date.ACommon.prototype.clone = function() {
        return new this.constructor(this);
    };
})(this.mailru_datetime_ns || this)
