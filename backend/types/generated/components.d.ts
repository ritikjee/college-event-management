import type { Schema, Attribute } from '@strapi/strapi';

export interface EventsEventDates extends Schema.Component {
  collectionName: 'components_events_event_dates';
  info: {
    displayName: 'eventDates';
    icon: 'calendar';
  };
  attributes: {
    endDate: Attribute.Date;
    startDate: Attribute.Date;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'events.event-dates': EventsEventDates;
    }
  }
}
