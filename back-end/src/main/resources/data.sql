INSERT INTO lab(id, name) VALUES (1, '랩1');
INSERT INTO gpu(id, gpu_name, model_name, running, teraflop, lab_id) VALUES(1, 'GPU서버1', 'Nvidia', false, 600, 1);
INSERT INTO lab_user(id, name, user_type, lab_id) VALUES(1, '관리자1', 'MANAGER', 1);
INSERT INTO job(id, name, waiting, lab_user_id, gpu_id) VALUES(1, '예약1', false, 1, 1);
INSERT INTO job(id, name, waiting, lab_user_id, gpu_id) VALUES(2, '예약2', true, 1, 1);
INSERT INTO job(id, name, waiting, lab_user_id, gpu_id) VALUES(3, '예약3', true, 1, 1);
