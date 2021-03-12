import psycopg2
from psycopg2 import Error

connection = psycopg2.connect(user = "postgres",password = "disha123",host="127.0.0.1",port="32977",database="sales")

cursor =connection.cursor()

create_table_query = '''CREATE TABLE user (USER_ID INT PRIMARY KEY NOT NULL, EMAIL_ID TEXT NOT NULL, MOBILE_NO INT NOTNULL, PASSWORD TEXT NOTNULL); '''

cursor.execute(create_table_query)
connection.commit()
print("Table Create Sucessfully")

cursor.close()
connection.close()
