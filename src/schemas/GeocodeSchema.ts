import { z } from "zod";

export const GeocodeSchema = z.array(
  z.object({
    name: z.string(),

    local_names: z
      .object({
        ascii: z.string().optional(),
        feature_name: z.string().optional(),
      })
      .catchall(z.string())
      .optional(),

    lat: z.number(),
    lon: z.number(),

    country: z.string(),
    state: z.string().optional(),
  })
);

export type GeocodeSchema = z.infer<typeof GeocodeSchema>;