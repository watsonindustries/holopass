ALTER TYPE "Generation" ADD VALUE IF NOT EXISTS 'Justice';
ALTER TYPE "Generation" ADD VALUE IF NOT EXISTS 'FLOW GLOW';
COMMIT;

INSERT INTO talents (
  name_en, name_jp, fanmark, gen
) VALUES
  -- Justice
  ('Elizabeth Rose Bloodflame', 'エリザベス・ローズ・ブラッドフレイム', '💄', 'Justice'),
  ('Gigi Murin', 'ジジ・ムリン', '👧', 'Justice'),
  ('Cecilia Immergreen', 'セシリア・イマーグリーン', '🍵', 'Justice'),
  ('Raora Panthera', 'ラオーラ・パンテーラ', '🐱', 'Justice'),
  -- FLOW GLOW
  ('Isaki Riona', '響咲リオナ', '🎤👑', 'FLOW GLOW'),
  ('Koganei Niko', '虎金妃笑虎', '☺️🐅', 'FLOW GLOW'),
  ('Mizumiya Su', '水宮枢', '💬', 'FLOW GLOW'),
  ('Rindo Chihaya', '輪堂 千速', '🎧🔧', 'FLOW GLOW'),
  ('Kikirara Vivi', '綺々羅々ヴィヴィ', '💅✨', 'FLOW GLOW')
ON CONFLICT (name_en) DO UPDATE
SET
  name_jp = EXCLUDED.name_jp,
  fanmark = EXCLUDED.fanmark,
  gen = EXCLUDED.gen
;