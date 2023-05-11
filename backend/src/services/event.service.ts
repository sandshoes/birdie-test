import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, events } from '@prisma/client';

@Injectable()
export class EventService {
  private readonly prisma = new PrismaClient();

  async getEvents(patient_id: string): Promise<events[]> {
    const events = await this.prisma.events.findMany({
      where: {
        care_recipient_id: patient_id,
      },
    });
    return events;
  }

  async getEventsByType(
    patient_id: string,
    event_type: string,
    filters: Record<string, string> = {},
    startDate: string,
    endDate: string,
  ): Promise<events[]> {
    const formattedFilters = this.formatFilters(filters);

    const events = await this.prisma.events.findMany({
      where: {
        care_recipient_id: patient_id,
        event_type: event_type,
        ...(startDate && { timestamp: { gte: new Date(startDate) } }),
        ...(endDate && { timestamp: { lte: new Date(endDate) } }),
        AND: formattedFilters,
      },
    });
    return events;
  }

  async getAggregatedDailyEventsByType(
    patient_id: string,
    event_type: string,
    aggregator: string,
    filters: Record<string, string> = {},
    startDate: string,
    endDate: string,
  ): Promise<any> {
    const isCount = aggregator === 'count' ? true : false;
    const formattedFilters = this.formatFilters(filters);

    const events = await this.prisma.events.findMany({
      where: {
        care_recipient_id: patient_id,
        event_type: event_type,
        ...(startDate && { timestamp: { gte: new Date(startDate) } }),
        ...(endDate && { timestamp: { lte: new Date(endDate) } }),
        AND: formattedFilters,
      },
    });

    const aggregatedDailyEvents = this.aggregateEventsByDay(
      events,
      aggregator,
      isCount,
    );

    return aggregatedDailyEvents;
  }

  private formatFilters(filters: Record<string, string>) {
    const formattedFilters = [];

    for (const key in filters) {
      if (filters[key]) {
        formattedFilters.push({
          payload: {
            path: [`${key}`],
            equals: isNaN(+filters[key]) ? filters[key] : +filters[key],
          },
        });
      }
    }
    return formattedFilters;
  }

  private aggregateEventsByDay(
    events: events[],
    aggregator: string,
    isCount: boolean,
  ) {
    return events.reduce((acc, event) => {
      const date = new Date(event.timestamp).toISOString().split('T')[0];
      if (isCount) {
        acc[date] = acc[date] ? acc[date] + 1 : 1;
      } else {
        const key = event.payload[aggregator];
        if (key) {
          acc[date] = acc[date] ? acc[date] + key : key;
        }
      }
      return acc;
    }, {});
  }
}
