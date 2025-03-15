
##tbl_admin
INSERT INTO tbl_admin (admin_id,first_name,last_name,mobile,email, pwd,created_date, created_by, modified_date, modified_by)VALUES (1, 'Admin','A','123456789','admin@gmail.com','password@123',current_timestamp,'Admin',current_timestamp,'Admin');

##tbl_user
INSERT INTO tbl_user (user_id,first_name,last_name,mobile,email, pwd,is_approved,created_date, created_by, modified_date, modified_by)VALUES (1, 'User','s','123456789','user@gmail.com','password@123','false',current_timestamp,'User',current_timestamp,'User');