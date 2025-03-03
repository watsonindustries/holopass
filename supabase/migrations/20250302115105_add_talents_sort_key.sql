ALTER TABLE talents
	ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0
;

-- Set gen debut orders, grouped by branch
WITH debut_order AS (
	SELECT gen, sort_order FROM (
		VALUES
		-- Hololive: JP
		('Gen 0',					0),
		('Gen 1',					1),
		('Gen 2',					2),
		('GAMERS',				3),
		('Gen 3',					4),
		('Gen 4',					5),
		('Gen 5',					6),
		('holoX',					7),
		-- Hololive: DEV_IS
		('ReGLOSS',				100),
		('FLOW GLOW',			101),
		-- Hololive: ID
		('Indonesia',			200),
		-- Hololive: EN
		('Myth',					300),
		('Promise',				301),
		('Advent',				302),
		('Justice',				303),
		-- Holostars: JP
		('STARS Gen 1',		1000),
		('STARS Gen 2',		1001),
		('STARS Gen 3',		1002),
		('UPROAR!!',			1003),
		-- Holostars: EN
		('TEMPUS HQ',			1100),
		('TEMPUS VG',			1101),
		('ARMIS',					1102),
		-- Cover
		('Alum',					2000),
		('Office Staff',	2001)
	) s(gen, sort_order)
)
UPDATE talents
	SET sort_order = debut_order.sort_order
FROM debut_order
WHERE talents.gen = debut_order.gen::"Generation"
;