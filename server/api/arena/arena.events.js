/**
 * Arena model events
 */

'use strict';

import {EventEmitter} from 'events';
import Arena from './arena.model';
var ArenaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ArenaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Arena.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ArenaEvents.emit(event + ':' + doc._id, doc);
    ArenaEvents.emit(event, doc);
  }
}

export default ArenaEvents;
