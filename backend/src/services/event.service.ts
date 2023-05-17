import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, events } from '@prisma/client';
import { aggregatorMap, categoricalMood } from 'src/utils/helper';

@Injectable()
export class EventService {
  private readonly prisma = new PrismaClient();

  async getEvents(
    patient_id: string,
    startDate: string,
    endDate: string,
  ): Promise<events[]> {
    const events = await this.prisma.events.findMany({
      where: {
        care_recipient_id: patient_id,
        timestamp: {
          ...(startDate && { gte: new Date(startDate) }),
          ...(endDate && { lte: new Date(endDate) }),
        },
      },
      include: {
        caregivers: true,
      },
      orderBy: {
        timestamp: 'desc',
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
        timestamp: {
          ...(startDate && { gte: new Date(startDate) }),
          ...(endDate && { lte: new Date(endDate) }),
        },
        AND: formattedFilters,
      },
      include: {
        caregivers: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
    return events;
  }

  async getAggregatedDailyEventsByType(
    patient_id: string,
    event_type: string,
    filters: Record<string, string> = {},
    startDate: string,
    endDate: string,
  ): Promise<any> {
    const formattedFilters = this.formatFilters(filters);

    const events = await this.prisma.events.findMany({
      where: {
        care_recipient_id: patient_id,
        event_type: event_type,
        timestamp: {
          ...(startDate && { gte: new Date(startDate) }),
          ...(endDate && { lte: new Date(endDate) }),
        },
        AND: formattedFilters,
      },
    });

    const aggregatedDailyEvents = this.aggregateEventsByDay(events, event_type);

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

  private aggregateEventsByDay(events: events[], event_type: string) {
    const aggregatedEvents = events.reduce((acc, event) => {
      const date = new Date(event.timestamp).toISOString().split('T')[0];
      switch (aggregatorMap[event_type]) {
        case 'count':
          acc[date] = acc[date] ? acc[date] + 1 : 1;
          break;
        case 'categorical_mood':
          const categoricalMoodKey = event.payload['mood'];
          if (categoricalMoodKey) {
            acc[date] = acc[date]
              ? acc[date] + categoricalMood[categoricalMoodKey]
              : categoricalMood[categoricalMoodKey];
          }
          break;
        case 'consumed_volume_ml':
        default:
          const key = event.payload[aggregatorMap[event_type]];
          if (key) {
            acc[date] = acc[date] ? acc[date] + key : key;
          }
          break;
      }
      return acc;
    }, {});

    return {
      aggregationType: aggregatorMap[event_type],
      aggregatedEvents,
    };
  }
}
