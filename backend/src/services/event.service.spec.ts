import { EventService } from '../services/event.service';
import { PrismaClient } from '@prisma/client';

describe('EventService', () => {
  let eventService: EventService;
  let prismaClient: PrismaClient;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    eventService = new EventService();
  });

  afterEach(async () => {
    // Close the Prisma client connection after each test
    await prismaClient.$disconnect();
  });

  it('should return events based on patient ID, start date, and end date', async () => {
    // Mock the `findMany` method of the Prisma client
    prismaClient.events.findMany = jest.fn().mockResolvedValue([
      // Mocked events data
      {
        id: '1',
        care_recipient_id: 'patient1',
        timestamp: new Date('2022-01-01'),
        caregivers: { first_name: 'John', last_name: 'Doe' },
      },
      {
        id: '2',
        care_recipient_id: 'patient1',
        timestamp: new Date('2022-01-02'),
        caregivers: { first_name: 'Jane', last_name: 'Smith' },
      },
    ]);

    const patientId = 'patient1';
    const startDate = '2022-01-01';
    const endDate = '2022-01-02';

    const events = await eventService.getEvents(patientId, startDate, endDate);

    expect(events).toHaveLength(2);
    expect(events[0].id).toBe('1');
    expect(events[1].id).toBe('2');
  });

  // Add more test cases for other methods of the EventService class
});
