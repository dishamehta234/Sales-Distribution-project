import json
import psycopg2
import threading
import time
import uuid

from connection import Connection
from http.server import SimpleHTTPRequestHandler, HTTPServer
from psycopg2 import Error
from urllib.parse import parse_qs  

class myHandler(SimpleHTTPRequestHandler):
    db_connection = Connection()

    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/json')
        self.end_headers()
        if self.path == '/do_signup':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            chk_eml = self.db_connection.chk_eml(data)
            if chk_eml is None: 
                user_data = self.db_connection.create_user(data)
                return self.wfile.write(json.dumps({'credentials': True}).encode()) 
            else:
                return self.wfile.write(json.dumps({'credentials': False}).encode())
        
        elif self.path == '/do_login':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            print(data)
            chk_role = self.db_connection.chk_role(data)
            print(chk_role[0])
            user_data = self.db_connection.user_exists(data)
            chk_eml = self.db_connection.chk_eml(data)
            chk_pass = self.db_connection.chk_pass(data)
            if user_data is None:
                if chk_eml is None:
                     return self.wfile.write(json.dumps({'email': False}).encode())
                elif chk_pass is None:
                     return self.wfile.write(json.dumps({'pass': False}).encode())
            else:
                session_id = str(uuid.uuid4())
                self.db_connection.create_user_session(session_id, user_data[0])
                if "Shopper" in chk_role:
                    return self.wfile.write(json.dumps({'session_id': session_id, 'user_id': user_data[0],'is_valid': True, 'role':"Shopper"}).encode())
                else:
                    return self.wfile.write(json.dumps({'session_id': session_id, 'user_id': user_data[0], 'is_valid': True, 'role':"Sales Person"}).encode())
        elif self.path == '/session_validate':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user = self.db_connection.session_validate(data)
            if user is None:
                return self.wfile.write(json.dumps({'valid': True}).encode())
            else:
                return self.wfile.write(json.dumps({'valid': False}).encode())
                
        elif self.path == '/do_logout':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.user_logout(data)
            return self.wfile.write(json.dumps({'logout': "success"}).encode())

            #==================================Sales====================================

        elif self.path == '/do_order':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            if chk_order is None:
                user_data = self.db_connection.add_order(data)
                return self.wfile.write(json.dumps({'credentials': True}).encode())
            else:
                return self.wfile.write(json.dumps({'credentials': False}).encode())
        elif self.path == '/view_day_list':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.get_day_data(data, id)
            data_list = list()  
            for day_list in user_data:                                
                day_list={
                    'v_id': day_list[0],
                    'id': day_list[1],
                    'zone_name': day_list[3],
                    'day': day_list,
                }
                data_list.append(day_list)
            return self.wfile.write(json.dumps({'day_detail': data_list}).encode())

        elif self.path == '/view_product_detail':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.get_product_data(data)
            print(data)
            data_list = list()  
            for product_list in user_data:                                
                product_list={
                    'p_id': product_list[0],
                    'p_name': product_list[1],
                    'p_price': product_list[2],
                }
                data_list.append(product_list)
            return self.wfile.write(json.dumps({'product_detail': data_list}).encode())
        elif self.path == '/do_new_order_list':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.get_new_order_data(data)
            print(data)
            data_list = list()  
            for new_order_list in user_data:                                
                new_order_list={
                    'ord_id': new_order_list[0],
                    'p_id': new_order_list[1],
                    'qty': new_order_list[2],
                    'price': new_order_list[3],
                }
                data_list.append(new_order_list)
            return self.wfile.write(json.dumps({'new_order_list': data_list}).encode())
        elif self.path == '/completed_order_list':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.get_completed_order_data(data)
            print(data)
            data_list = list()  
            for order_list in user_data:                                
                order_list={
                    'ord_id': order_list[0],
                    'id': order_list[1],
                    'shop_id': order_list[2],
                    'p_id': order_list[3],
                    'date_order_day': order_list[4].day,
                    'date_order_month': order_list[4].month,
                    'date_order_year': order_list[4].year,
                    'date_order_hour': order_list[4].hour,
                    'date_order_minute': order_list[4].minute,
                    'ord_status': order_list[5],
                    'payment_status': order_list[5],
                }
                data_list.append(order_list)
            return self.wfile.write(json.dumps({'order_list': data_list}).encode())

        elif self.path == '/previous_payment_list':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.get_payment_data(data)
            print(data)
            data_list = list()  
            for payment_list in user_data:                                
                payment_list={
                    'p_id': payment_list[0],
                    'shop_id': payment_list[1],
                    'date_pymt_day': payment_list[2].day,
                    'date_pymt_month': payment_list[2].month,
                    'date_pymt_year': payment_list[2].year,
                    'date_pymt_hour': payment_list[2].hour,
                    'date_pymt_minute': payment_list[2].minute,
                    'amount': payment_list[3],
                    'payment_mthd': payment_list[4],
                    'remark': payment_list[5],
                }
                data_list.append(payment_list)
            return self.wfile.write(json.dumps({'payment_list': data_list}).encode())

        elif self.path == '/get_sales_profile':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            result = self.db_connection.get_sales_profile(data)
            data_list = list()
            for sales_profile in result:                                
                profile_list={
                    'id': sales_profile[0],
                    'email': sales_profile[2],
                    'mobile_no': sales_profile[4],
                }
                data_list.append(profile_list)

            return self.wfile.write(json.dumps({'sales_profile': data_list}).encode())

#==========================shopper==============================
        elif self.path == '/get_shopper_profile':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            result = self.db_connection.get_shopper_profile(data)
            data_list = list()
            for shopper_profile in result:                                
                profile_list={
                    'id': shopper_profile[0],
                    'name': shopper_profile[1],
                    'email': shopper_profile[2],
                    'mobile_no': shopper_profile[4],
                    'address': shopper_profile[5],
                }
                data_list.append(profile_list)

            return self.wfile.write(json.dumps({'shopper_profile': data_list}).encode())

        elif self.path == '/shop_order_list':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.get_shop_order_data(data)
            print(data)
            data_list = list()  
            for shop_list in user_data:                                
                shop_list={
                    'ord_id': shop_list[0],
                    'id': shop_list[1],
                    'shop_id': shop_list[2],
                    'date_order_day': shop_list[3].day,
                    'date_order_month': shop_list[3].month,
                    'date_order_year': shop_list[3].year,
                    'date_order_hour': shop_list[3].hour,
                    'date_order_minute': shop_list[3].minute,
                }
                data_list.append(shop_list)
            print(data_list)
            return self.wfile.write(json.dumps({'shop_list': data_list}).encode())

        elif self.path == '/shop_profile':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            result = self.db_connection.get_shop_data(data)
            data_list = list()
            for shop_profile in result:                                
                profile_list={
                    'shop_id': shop_profile[0],
                    'id': shop_profile[1],
                    's_name': shop_profile[2],
                    's_address': shop_profile[3],
                    's_target_mthly': shop_profile[4],
                    'zone_name': shop_profile[5],
                }
                data_list.append(profile_list)

            return self.wfile.write(json.dumps({'shop_profile': data_list}).encode())

        elif self.path == '/view_sp_visited_list':
            data = self.rfile.read(int(self.headers.get('Content-Length')))
            data = json.loads(data)
            user_data = self.db_connection.get_sp_visited(data, id)
            data_list = list()
            for sp_visited in user_data:
                sp_visited={
                    'id': sp_visited[0],
                    'shop_id': sp_visited[1],
                    's_name': sp_visited[2],
                    's_address': sp_visited[3],
                    'day': sp_visited[4],
                }
                data_list.append(sp_visited)
            return self.wfile.write(json.dumps({'sp_visited': data_list}).encode())
    def do_GET(self):
        if self.path in ['/', '/signup', '/signin', '/home', '/aboutus', '/loginhome', '/payment', '/ordersales', '/day_list', '/payment_list', '/completed_order_list', '/sales_person_profile', '/shopper_profile', '/product_list' ]:
            with open('index.html') as f:
                Cookie = self.headers.get('Cookie')
                session_id = False
                html = f.read()
                session_info = {
                    'user_id': None,
                    'is_valid': False,
                    'user_role': None,
                    'name': None,
                }
                if Cookie:
                    session_cookie = parse_qs(Cookie.replace(' ', ''))
                    if session_cookie.get('session_id'):
                        session_id = session_cookie.get('session_id')[0]
                        user = self.db_connection.session_validate({'session_id': session_id})
                        get_name = self.db_connection.get_name({'session_id': session_id})
                        if user and len(user):
                            session_info = {
                                'user_id': user[0],
                                'is_valid': True,
                                'session_id': session_id,
                                'user_role': True,
                                'name': get_name
                            }
                html = html.replace('$session_info', json.dumps(session_info))
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(html.encode())
        else:
            super(myHandler, self).do_GET()

            
def start_server():
    SimpleHTTPRequestHandler.extensions_map['.js'] = 'application/javascript'
    httpd = HTTPServer(('0.0.0.0', 3600), myHandler)
    httpd.serve_forever()

url = 'http://127.0.0.1:3600'

if __name__ == "__main__":
    print("----------------------")
    print("----------------------")
    print("Server running on: {}".format(url))
    threading.Thread(target=start_server, daemon=True).start()

    while True:
        try:
            time.sleep(1)
        except KeyboardInterrupt:
            httpd.server_close()
            quit(0)