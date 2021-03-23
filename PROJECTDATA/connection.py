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
                email varchar  NOT NULL,
                password varchar NOT NULL,
                mobile_no varchar NOT NULL,
                role varchar NOT NULL,
                session varchar
            );'''
            self.cr.execute(user);
            ptnr = '''CREATE TABLE partner(
                partner_id SERIAL PRIMARY KEY,
                id SERIAL NOT NULL,
                name varchar NOT NULL,
                address varchar NOT NULL,
                FOREIGN KEY (id) REFERENCES users (id)
            );'''
            self.cr.execute(ptnr);
            zon = '''CREATE TABLE zone(
                zone_id SERIAL PRIMARY KEY,
                zone_name varchar NOT NULL
            );'''
            self.cr.execute(zon);
            shop_dtl = '''CREATE TABLE shop_detail(
                shop_id SERIAL PRIMARY KEY,
                partner_id SERIAL NOT NULL,
                zone_id SERIAL NOT NULL,
                s_name varchar NOT NULL,
                s_address varchar NOT NULL,
                s_target_mthly varchar NOT NULL,
                status boolean NOT NULL,
                FOREIGN KEY (partner_id) REFERENCES partner (partner_id),
                FOREIGN KEY (zone_id) REFERENCES zone (zone_id)
            );'''
            self.cr.execute(shop_dtl);
            visit_plan = '''CREATE TABLE visiting_plan(
                v_id SERIAL PRIMARY KEY,
                partner_id SERIAL NOT NULL,
                zone_id SERIAL  NOT NULL,
                day varchar NOT NULL,
                FOREIGN KEY (partner_id) REFERENCES partner (partner_id),
                FOREIGN KEY (zone_id) REFERENCES zone (zone_id)
            );'''
            self.cr.execute(visit_plan);
            shop_visit = '''CREATE TABLE shop_visited(
                sv_id SERIAL PRIMARY KEY,
                partner_id SERIAL NOT NULL,
                shop_id SERIAL NOT NULL,
                visiting_time TIME NOT NULL,
                FOREIGN KEY (partner_id) REFERENCES partner (partner_id),
                FOREIGN KEY (shop_id) REFERENCES shop_detail (shop_id)
            );'''
            self.cr.execute(shop_visit);
            prdct = '''CREATE TABLE product(
                p_id SERIAL PRIMARY KEY,
                p_name varchar NOT NULL,
                p_price varchar NOT NULL
            );'''
            self.cr.execute(prdct);
            ord_dtl = '''CREATE TABLE order_detail(
                ord_id SERIAL PRIMARY KEY,
                p_id SERIAL NOT NULL,
                qty varchar NOT NULL,
                price varchar NOT NULL,
                FOREIGN KEY (p_id) REFERENCES product (p_id)
            );'''
            self.cr.execute(ord_dtl);
            ordr = '''CREATE TABLE order(
                o_id SERIAL PRIMARY KEY,
                partner_id SERIAL NOT NULL,
                shop_id SERIAL NOT NULL,
                date_order DATE NOT NULL,
                ord_status BOOLEAN NOT NULL,
                payment_status BOOLEAN NOT NULL,
                FOREIGN KEY (partner_id) REFERENCES partner (partner_id),
                FOREIGN KEY (shop_id) REFERENCES shop_detail (shop_id)
            );'''
            self.cr.execute(ordr);
            paymt = '''CREATE TABLE payment(
                p_id SERIAL PRIMARY KEY,
                shop_id SERIAL NOT NULL,
                date_pymt DATE NOT NULL,
                amount varchar NOT NULL,
                payment_mthd BOOLEAN NOT NULL,
                remark varchar NOT NULL,
                FOREIGN KEY (shop_id) REFERENCES shop_detail (shop_id)
            );'''
            self.cr.execute(paymt);
        else:
            self.create_connection(self.db_name);


    def create_connection(self, db_name):
        self.connection = psycopg2.connect(user="postgres", password="postgres", host="127.0.0.1", port="5432", database=db_name)
        self.connection.autocommit = True
        self.cr = self.connection.cursor()

    def chk_eml(self, data):
        self.cr.execute("SELECT id FROM users WHERE email='%s'" % (data['email']))
        return self.cr.fetchone()

    def chk_pass(self, data):
        self.cr.execute("SELECT id FROM users WHERE password='%s'" % (data['password']))
        return self.cr.fetchone()

    def create_user(self, dictn):
        user = """INSERT INTO users (email, password, mobile_no,role) VALUES ('%s', '%s', '%s', '%s')""" % (dictn['email'], dictn['password'], dictn['mobilenum'], dictn['role']);
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
        