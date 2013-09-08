    (function () {

      var containsItemFrom    = function (item) { return this.indexOf(item) !== -1; };
      var notContainsItemFrom = function (item) { return this.indexOf(item) === -1; };
      var toStatus = function (item) { return { value: item, status: this.toString() }; };

      // arrayDiff assumes no duplicate items

      sx.util.arrayDiff = function (a, b) {

        var added     = b.filter(notContainsItemFrom, a).map(toStatus, 'added');
        var retained  = b.filter(containsItemFrom,    a).map(toStatus, 'retained');
        var removed   = a.filter(notContainsItemFrom, b).map(toStatus, 'removed');

        return added.concat(retained, removed);
      };

    })();
    