/**
 *
 * @api public
 */
var MixpanelExport = require('mixpanel-data-export');
var _ = require('highland');

function mixpanelJQL(key, secret, query) {
  var panel = new MixpanelExport({
    api_key: key,
    api_secret: secret
  });
  return _(function(push) {
    panel.get('jql', {
      script: query()
    }, function(data) {
      for (var i = 0; i < data.length; ++i) {
        push(null, data[i]);
      }
      push(null, _.nil);
    });
  });
}
module.exports = mixpanelJQL;