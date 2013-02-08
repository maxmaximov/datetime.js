(function (date) {
    "use strict";

    /**
     * @class Abstract Common DateTime Class
     * @abstract
     * @author Max Maximov <max.maximov@gmail.com>
     */
    date.ACommon = function () {
    };

    /**
     * @return date.ACommon
     */
    date.ACommon.prototype.clone = function () {
        return new this.constructor(this);
    };
})(this.mailru_datetime_ns || this)
