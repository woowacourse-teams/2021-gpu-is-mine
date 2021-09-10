SET REFERENTIAL_INTEGRITY FALSE;
TRUNCATE TABLE lab RESTART IDENTITY;
TRUNCATE TABLE member RESTART IDENTITY;
TRUNCATE TABLE gpu_server RESTART IDENTITY;
TRUNCATE TABLE gpu_board RESTART IDENTITY;
TRUNCATE TABLE job RESTART IDENTITY;
SET REFERENTIAL_INTEGRITY TRUE;

ALTER TABLE lab ALTER COLUMN id RESTART WITH 1;
ALTER TABLE member ALTER COLUMN id RESTART WITH 1;
ALTER TABLE gpu_server ALTER COLUMN id RESTART WITH 1;
ALTER TABLE gpu_board ALTER COLUMN id RESTART WITH 1;
ALTER TABLE job ALTER COLUMN id RESTART WITH 1;
