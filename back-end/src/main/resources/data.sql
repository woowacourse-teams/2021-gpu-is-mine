INSERT INTO lab(id, name) VALUES (1, '랩1');
INSERT INTO gpu_server(id, name, is_on, memory_size, disk_size, lab_id) VALUES(1, 'GPU서버1',  false, 600, 1024, 1);
INSERT INTO gpu_server(id, name, is_on, memory_size, disk_size, lab_id) VALUES(2, 'GPU서버2',  true, 800, 1024, 1);
INSERT INTO gpu_board(id, is_working, performance, model_name, gpu_server_id) VALUES (1, true, 800, 'aaa', 1);
INSERT INTO gpu_board(id, is_working, performance, model_name, gpu_server_id) VALUES (2, true, 800, 'bbb', 2);
INSERT INTO lab_user(id, name, user_type, lab_id) VALUES(1, '관리자1', 'MANAGER', 1);
INSERT INTO job(id, name, status, lab_user_id, gpu_board_id) VALUES(1, '예약1', 'RUNNING', 1, 1);
INSERT INTO job(id, name, status, lab_user_id, gpu_board_id) VALUES(2, '예약2', 'WAITING', 1, 1);
INSERT INTO job(id, name, status, lab_user_id, gpu_board_id) VALUES(3, '예약3', 'WAITING', 1, 2);
INSERT INTO job(id, name, status, lab_user_id, gpu_board_id) VALUES(4, '예약4', 'WAITING', 1, 1);
