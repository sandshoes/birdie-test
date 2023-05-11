import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { EventService } from '../services/event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  getEvents() {
    return this.eventService.getEvents('df50cac5-293c-490d-a06c-ee26796f850d');
  }

  @Get('/:event_type')
  getEventsByType(@Param('event_type') eventType, @Query() query) {
    const { start_date: startDate, end_date: endDate, ...filters } = query;

    return this.eventService.getEventsByType(
      'df50cac5-293c-490d-a06c-ee26796f850d',
      eventType,
      filters,
      startDate,
      endDate,
    );
  }

  @Get('/aggregated/:event_type/:aggregator')
  getAggregatedEventsByType(
    @Param('event_type') eventType,
    @Param('aggregator') aggregator,
    @Query() query,
  ) {
    const { start_date: startDate, end_date: endDate, ...filters } = query;

    return this.eventService.getAggregatedDailyEventsByType(
      'df50cac5-293c-490d-a06c-ee26796f850d',
      eventType,
      aggregator,
      filters,
      startDate,
      endDate,
    );
  }

  @Post('/ask-doc')
  getLLMQuery(): string {
    return 'Hi doc';
  }
}
