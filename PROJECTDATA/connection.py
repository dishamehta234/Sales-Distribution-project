#!/usr/bin/env python3
import psycopg2
from psycopg2 import Error

class Connection():

    def __init__(self):
        print('>>> connection')
        self.create_connection('postgres')
        self.db_name = 'sales'
        db_check = "SELECT 1 FROM pg_database WHERE datname='%s'" % self.db_name
        self.cr.execute(db_check)
        if not len(self.cr.fetchall()):
            self.cr.execute('CREATE DATABASE %s' % self.db_name)
            self.connection.close()
            self.create_connection(self.db_name)
            user = '''CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                name varchar NOT NULL,
                email varchar  NOT NULL,
                password varchar NOT NULL,
                mobile_no varchar NOT NULL,
                address varchar NOT NULL,
                role varchar NOT NULL,
                session varchar
            );'''
            self.cr.execute(user);
            shop_dtl = '''CREATE TABLE shop_detail(
                shop_id SERIAL PRIMARY KEY,
                id SERIAL NOT NULL,
                s_name varchar NOT NULL,
                s_address varchar NOT NULL,
                s_target_mthly varchar NOT NULL,
                zone_name varchar NOT NULL,
                FOREIGN KEY (id) REFERENCES users (id)
            );'''
            self.cr.execute(shop_dtl);
            visit_plan = '''CREATE TABLE visiting_plan(
                v_id SERIAL PRIMARY KEY,
                id SERIAL NOT NULL,
                day varchar NOT NULL,
                FOREIGN KEY (id) REFERENCES users (id)
            );'''
            self.cr.execute(visit_plan);

            shop_visit = '''CREATE TABLE shop_visited(
                sv_id SERIAL PRIMARY KEY,
                id SERIAL NOT NULL,
                shop_id SERIAL NOT NULL,
                visiting_day varchar NOT NULL,
                FOREIGN KEY (id) REFERENCES users (id),
                FOREIGN KEY (shop_id) REFERENCES shop_detail (shop_id)
            );'''
            self.cr.execute(shop_visit);

            prdct = '''CREATE TABLE product(
                p_id SERIAL PRIMARY KEY,
                p_name varchar NOT NULL,
                p_price varchar NOT NULL
            );'''
            self.cr.execute(prdct);

            ordrr ='''CREATE TABLE orderr(
                ord_id SERIAL PRIMARY KEY,
                id SERIAL NOT NULL,
                shop_id SERIAL NOT NULL,
                p_id SERIAL NOT NULL,
                date_order TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
                ord_status BOOLEAN,
                payment_status BOOLEAN,
                FOREIGN KEY (p_id) REFERENCES product (p_id),
                FOREIGN KEY (id) REFERENCES users (id),
                FOREIGN KEY (shop_id) REFERENCES shop_detail (shop_id)
            );'''
            self.cr.execute(ordrr);
            paymnt = '''CREATE TABLE payment(
                p_id SERIAL PRIMARY KEY,
                shop_id SERIAL NOT NULL,
                date_pymt TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
                amount varchar NOT NULL,
                payment_mthd varchar,
                remark varchar NOT NULL,
                FOREIGN KEY (shop_id) REFERENCES shop_detail (shop_id)
            );'''
            self.cr.execute(paymnt);
        else:
            self.create_connection(self.db_name);


    def create_connection(self, db_name):
        self.connection = psycopg2.connect(user="postgres", password="postgres", host="127.0.0.1", port="5432", database=db_name)
        self.connection.autocommit = True
        self.cr = self.connection.cursor()

    def chk_role(self,data):
        self.cr.execute("SELECT role FROM users WHERE email='%s' and password='%s'" % (data['unm'], data['pass']))
        return self.cr.fetchone()

    def chk_eml(self, data):
        self.cr.execute("SELECT id FROM users WHERE email='%s'" % (data['unm']))
        return self.cr.fetchone()

    def chk_pass(self, data):
        self.cr.execute("SELECT id FROM users WHERE password='%s'" % (data['pass']))
        return self.cr.fetchone()

    def create_user(self, dictn):
        user = """INSERT INTO users (name, email, password, mobile_no, address,role) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')""" % (dictn['name'], dictn['unm'], dictn['password'], dictn['mobilenum'], dictn['address'], dictn['role']);
        self.cr.execute(user)
        print('>>> Data Added')

    def user_exists(self, data):
        self.cr.execute("SELECT id FROM users WHERE email='%s' and password='%s'" % (data['unm'], data['pass']))
        return self.cr.fetchone()
        
    def create_user_session(self, session_id, user_id):
        self.cr.execute("UPDATE users set session='%s' where id='%s'" % (session_id, user_id))
        print('>>> Data updated')

    def session_validate(self, data):
        self.cr.execute("SELECT id FROM users WHERE session='%s'" % (data['session_id']))
        return self.cr.fetchone()

    def user_logout(self, data):
        print(data)
        self.cr.execute("UPDATE users set session=null where session='%s'" % (data['session_id']))
        
#___________________________for Order confirmed by Sales Person ____________________________

    def get_name(self, data):
        self.cr.execute("SELECT name FROM users WHERE session='%s'" % (data['session_id']))
        return self.cr.fetchone()
    def get_day_data(self, data, id):
        self.cr.execute("SELECT visiting_plan.v_id, visiting_plan.id, visiting_plan.day, shop_detail.zone_name FROM visiting_plan INNER JOIN shop_detail ON visiting_plan.id=shop_detail.id WHERE visiting_plan.id=1")
        return self.cr.fetchall()
    def get_payment_data(self, data):
        self.cr.execute("SELECT * FROM payment")
        return self.cr.fetchall()
        print(data)
    def get_new_order_data(self, data):
        self.cr.execute("SELECT * FROM order_detail")
        return self.cr.fetchall()
        print(data)
    def get_product_data(self, data):
        self.cr.execute("SELECT * FROM product")
        return self.cr.fetchall()

    def get_completed_order_data(self, data):
        self.cr.execute("SELECT * FROM orderr")
        return self.cr.fetchall()
        print(data)
    def add_order(self, dictn):
        ord_dtl = """INSERT INTO order_detail (p_id, qty, price) VALUES (%s, %s, %s)""" % (dictn['pid'], dictn['qty'], dictn['price']);
        self.cr.execute(ord_dtl)
    def get_sales_profile(self,data):
        self.cr.execute("SELECT * from users WHERE id='%s'"%(data['user_id']))
        return self.cr.fetchall()

    def chk_order(self, data):
        self.cr.execute("SELECT * FROM order_detail WHERE p_id=%s" % (data['p_id']))
        return self.cr.fetchall()


    def get_shopper_profile(self,data):
        self.cr.execute("SELECT * from users WHERE id='%s'"%(data['user_id']))
        return self.cr.fetchall()

    def get_shop_order_data(self, data):
        self.cr.execute("SELECT orderr.ord_id,orderr.id,orderr.shop_id,orderr.date_order from orderr INNER JOIN users ON orderr.id=users.id WHERE orderr.id=1;")
        return self.cr.fetchall()
       

    def get_shop_data(self, data):
        self.cr.execute("SELECT * FROM shop_detail")
        return self.cr.fetchall()
        print(data)

    def get_sp_visited(self,data,id):
        self.cr.execute("SELECT shop_visited.sv_id,users.name,shop_detail.s_name,shop_detail.zone_name,shop_visited.visiting_day FROM shop_visited INNER JOIN users ON shop_visited.id=users.id INNER JOIN shop_detail ON shop_visited.shop_id=shop_detail.shop_id;")
        return self.cr.fetchall()
        print(data)
