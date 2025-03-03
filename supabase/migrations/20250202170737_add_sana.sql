INSERT INTO talents (
  name_en, name_jp, fanmark, gen
) VALUES 
  ('Tsukumo Sana', '九十九 佐命', '🪐', 'Alum')
ON CONFLICT (name_en) DO UPDATE
SET
  name_jp = EXCLUDED.name_jp,
  fanmark = EXCLUDED.fanmark,
  gen = EXCLUDED.gen
;