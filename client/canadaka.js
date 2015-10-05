var leaving = new Date('September 24, 2015 08:00:00');
var interval;

function getSeconds(diff, days, hours, minutes) {
  return Math.floor(diff / 1000) - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
}

function getMinutes(diff, days, hours) {
  return Math.floor(diff / 1000 / 60) - (days * 24 * 60) - (hours * 60);
}

function getHours(diff, days) {
  return Math.floor(diff / 1000 / 60 / 60) - (days * 24);
}

function getDays(diff) {
  return Math.floor(diff / 1000 / 60 / 60 / 24);
}

function getDiffString() {
  var diff = leaving - new Date();
  if (diff <= 0) {
    Meteor.clearInterval(interval);
    Session.set('diff', 'Weeeeeeeeeeeeeeee!!!');
    return;
  }
  var days = getDays(diff);
  var hours = getHours(diff, days);
  var minutes = getMinutes(diff, days, hours);
  var seconds = getSeconds(diff, days, hours, minutes);
  Session.set('diff', days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds');
}

Template.countdown.helpers({
  tick: function() {
    return Session.get('diff');
  }
});

Meteor.startup(function() {
  getDiffString();
  interval = Meteor.setInterval(function() {
    getDiffString();
  }, 1000);
});
