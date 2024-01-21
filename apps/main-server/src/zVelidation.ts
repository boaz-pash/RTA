import { z } from "zod";

export const eventSchema = z.object({
  event_name: z.string().min(1),
  event_description: z.string(),
  event_location: z.string(),
  event_date: z.string(),
});

