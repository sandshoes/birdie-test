import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { AuthRequest } from 'src/types';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getEvents(
    @Req() req: AuthRequest,
    @Query('start_date') startDate,
    @Query('end_date') endDate,
  ) {
    return this.eventService.getEvents(req.careRecipientId, startDate, endDate);
  }

  @Get('/:event_type')
  async getEventsByType(
    @Req() req: AuthRequest,
    @Param('event_type') eventType,
    @Query() query,
  ) {
    const { start_date: startDate, end_date: endDate, ...filters } = query;
    return this.eventService.getEventsByType(
      req.careRecipientId,
      eventType,
      filters,
      startDate,
      endDate,
    );
  }

  @Get('/aggregated/:event_type')
  async getAggregatedEventsByType(
    @Req() req: AuthRequest,
    @Param('event_type') eventType,
    @Query() query,
  ) {
    const { start_date: startDate, end_date: endDate, ...filters } = query;

    return this.eventService.getAggregatedDailyEventsByType(
      req.careRecipientId,
      eventType,
      filters,
      startDate,
      endDate,
    );
  }
}
