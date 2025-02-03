-- First transaction: Add new enum values
ALTER TYPE "Generation" ADD VALUE 'STARS Gen 1';
ALTER TYPE "Generation" ADD VALUE 'STARS Gen 2';
ALTER TYPE "Generation" ADD VALUE 'STARS Gen 3';
ALTER TYPE "Generation" ADD VALUE 'UPROAR!!';
ALTER TYPE "Generation" ADD VALUE 'TEMPUS HQ';
ALTER TYPE "Generation" ADD VALUE 'TEMPUS VG';
ALTER TYPE "Generation" ADD VALUE 'ARMIS';

-- Commit the first transaction
COMMIT;

-- Second transaction: Insert new records
INSERT INTO talents (
  name_en, name_jp, gen, fanmark
) VALUES 
  ('Hanasaki Miyabi', '花咲みやび', 'STARS Gen 1', '🌺'),
  ('Kanade Izuru', '奏手イヅル', 'STARS Gen 1', '🎸'),
  ('Arurandeisu', 'アルランディス', 'STARS Gen 1', '🍕'),
  ('Rikka', '律可', 'STARS Gen 1', '⚙️'),
  ('Kagami Kira', '鏡見キラ', 'Alum', '💙'),
  ('Yakushiji Suzaku', '薬師寺朱雀', 'Alum', '💊'),
  ('Astel Leda', 'アステル・レダ', 'STARS Gen 2', '🎭'),
  ('Kishido Temma', '岸堂天真', 'STARS Gen 2', '🦔💨'),
  ('Yukoku Roberu', '夕刻ロベル', 'STARS Gen 2', '🍷'),
  ('Kageyama Shien', '影山シエン', 'STARS Gen 3', '🟣'),
  ('Aragami Oga', '荒咬オウガ', 'STARS Gen 3', '🐃'),
  ('Tsukishita Kaoru', '月下カオル', 'Alum', '💅'),
  ('Yatogami Fuma', '夜十神封魔', 'UPROAR!!', '🦝'),
  ('Utsugi Uyu', '羽継烏有', 'UPROAR!!', '🃏'),
  ('Minase Rio', '水無世燐央', 'UPROAR!!', '🕯️'),
  ('Hizaki Gamma', '緋崎ガンマ', 'Alum', '🖌️'),
  ('Regis Altare', 'リージス・アルテア', 'TEMPUS HQ', '🎇'),
  ('Axel Syrios', 'アクセル・シリオス', 'TEMPUS HQ', '⛓️'),
  ('Magni Dezmond', 'マグニ・デズモンド', 'Alum', '🧤'),
  ('Noir Vesper', 'ノワール・ヴェスパー', 'Alum', '📗'),
  ('Gavis Bettel', 'ガビス・ベッテル', 'TEMPUS VG', '🎩'),
  ('Machina X Flayon', 'マキナ・X・フレオン', 'TEMPUS VG', '🪫'),
  ('Banzoin Hakka', '万象院ハッカ', 'TEMPUS VG', '🔅'),
  ('Josuiji Shinri', '定水寺シンリ', 'TEMPUS VG', '🏹'),
  ('Jurard T Rexford', 'ジュラルド・ティー・レクスフォード', 'ARMIS', '🦖'),
  ('Goldbullet', 'ゴールドブレット', 'ARMIS', '🦅'),
  ('Octavio', 'オクタビオ', 'ARMIS', 'ထ'),
  ('Crimzon Ruze', 'クリムゾン・ルーズ', 'ARMIS', '💢');