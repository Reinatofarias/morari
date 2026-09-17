INSERT INTO public.availability (weekday, enabled, start_time, end_time) VALUES
  (0, false, '08:00', '18:00'),
  (1, true,  '08:00', '18:00'),
  (2, true,  '08:00', '18:00'),
  (3, true,  '08:00', '18:00'),
  (4, true,  '08:00', '18:00'),
  (5, true,  '08:00', '18:00'),
  (6, false, '08:00', '12:00')
ON CONFLICT (weekday) DO NOTHING;
