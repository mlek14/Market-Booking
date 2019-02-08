-- update users set user_status = 'con' where user_username = 'market01'

select * from users where (user_email = 'market01' || user_username = 'market01') && user_password = '1234' && user_status = 'con'