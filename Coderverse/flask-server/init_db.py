import psycopg2

conn = psycopg2.connect(database="flask_db_2", host="localhost", user="postgres", password="0823", port="5432")
cur = conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS users (
id serial PRIMARY KEY, 
name varchar(100),
email varchar(100),
birth_date varchar(100),
password varchar(100),
salt varchar(100),
profile_pic varchar(100) DEFAULT 'profile_pic_one.png',
challenge_progress jsonb DEFAULT '{}',
days_active jsonb DEFAULT '{}',
badges text[] DEFAULT ARRAY ['first_badge'],
avatars text[] DEFAULT ARRAY ['profile_pic_one.png'],
streak integer DEFAULT 0,
max_streak integer DEFAULT 0,
points integer DEFAULT 0,
weekly_wins integer DEFAULT 0
);""")

cur.execute("""CREATE TABLE IF NOT EXISTS python_kids_progress (
id integer PRIMARY KEY, 
FOREIGN KEY (id) REFERENCES users(id),
points integer DEFAULT 0,
badges integer DEFAULT 0,
current integer DEFAULT 0,
modules jsonb DEFAULT '
{
  "1.1l": {"pages_complete": 0, "complete": false},
  "1.2l": {"pages_complete": 0, "complete": false},
  "1.2a": {"pages_complete": 0, "complete": false},
  "2.1l": {"pages_complete": 0, "complete": false},
  "2.2a": {"pages_complete": 0, "complete": false},
  "2.2a": {"pages_complete": 0, "complete": false},
  "2.3l": {"pages_complete": 0, "complete": false},
  "2.3a": {"pages_complete": 0, "complete": false},
  "2.4l": {"pages_complete": 0, "complete": false},
  "2.4a": {"pages_complete": 0, "complete": false},
  "2.5l": {"pages_complete": 0, "complete": false},
  "2.5a": {"pages_complete": 0, "complete": false},
  "2.6p": {"pages_complete": 0, "complete": false},
  "2t": {"pages_complete": 0, "complete": false},
  "3.1l": {"pages_complete": 0, "complete": false},
  "3.2l": {"pages_complete": 0, "complete": false},
  "3.2a": {"pages_complete": 0, "complete": false},
  "3.3l": {"pages_complete": 0, "complete": false},
  "3.3a": {"pages_complete": 0, "complete": false},
  "3.4p": {"pages_complete": 0, "complete": false},
  "3q": {"pages_complete": 0, "complete": false},
  "4.1l": {"pages_complete": 0, "complete": false},
  "4.2l": {"pages_complete": 0, "complete": false},
  "4.2a": {"pages_complete": 0, "complete": false},
  "4.3l": {"pages_complete": 0, "complete": false},
  "4.3a": {"pages_complete": 0, "complete": false},
  "4.4l": {"pages_complete": 0, "complete": false},
  "4.4a": {"pages_complete": 0, "complete": false},
  "4.5l": {"pages_complete": 0, "complete": false},
  "4.6l": {"pages_complete": 0, "complete": false},
  "4.6a": {"pages_complete": 0, "complete": false},
  "4.7p": {"pages_complete": 0, "complete": false},
  "4t": {"pages_complete": 0, "complete": false},
  "5.1l": {"pages_complete": 0, "complete": false},
  "5.2l": {"pages_complete": 0, "complete": false},
  "5.2a": {"pages_complete": 0, "complete": false},
  "5.3l": {"pages_complete": 0, "complete": false},
  "5.3a": {"pages_complete": 0, "complete": false},
  "5.4l": {"pages_complete": 0, "complete": false},
  "5.4a": {"pages_complete": 0, "complete": false},
  "5.5p": {"pages_complete": 0, "complete": false},
  "5t": {"pages_complete": 0, "complete": false},
  "6.1l": {"pages_complete": 0, "complete": false},
  "6.1a": {"pages_complete": 0, "complete": false},
  "6.2l": {"pages_complete": 0, "complete": false},
  "6.2a": {"pages_complete": 0, "complete": false},
  "6.3l": {"pages_complete": 0, "complete": false},
  "6.4p": {"pages_complete": 0, "complete": false},
  "F.1l": {"pages_complete": 0, "complete": false},
  "F.1p": {"pages_complete": 0, "complete": false}
}'
);""")

cur.execute("""CREATE TABLE IF NOT EXISTS web_dev_basics_progress (
id integer PRIMARY KEY,
FOREIGN KEY (id) REFERENCES users(id),
points integer DEFAULT 0,
badges integer DEFAULT 0,
current integer DEFAULT 0,
modules jsonb DEFAULT '
{
  "1.1l": {"pages_complete": 0, "complete": false},
  "1.2l": {"pages_complete": 0, "complete": false},
  "1.2a": {"pages_complete": 0, "complete": false},
  "1.3l": {"pages_complete": 0, "complete": false},
  "1.4l": {"pages_complete": 0, "complete": false},
  "1.4a": {"pages_complete": 0, "complete": false},
  "1.5l": {"pages_complete": 0, "complete": false},
  "1.5a": {"pages_complete": 0, "complete": false},
  "1.6l": {"pages_complete": 0, "complete": false},
  "1.6a": {"pages_complete": 0, "complete": false},
  "1.7l": {"pages_complete": 0, "complete": false},
  "1.7a": {"pages_complete": 0, "complete": false},
  "1.8l": {"pages_complete": 0, "complete": false},
  "1.8a": {"pages_complete": 0, "complete": false},
  "1.9l": {"pages_complete": 0, "complete": false},
  "1.9a": {"pages_complete": 0, "complete": false},
  "1.10l": {"pages_complete": 0, "complete": false},
  "1.11p": {"pages_complete": 0, "complete": false},
  "1t": {"pages_complete": 0, "complete": false},
  "2.1l": {"pages_complete": 0, "complete": false},
  "2.2l": {"pages_complete": 0, "complete": false},
  "2.2a": {"pages_complete": 0, "complete": false},
  "2.2a": {"pages_complete": 0, "complete": false},
  "2.3l": {"pages_complete": 0, "complete": false},
  "2.3a": {"pages_complete": 0, "complete": false},
  "2.4l": {"pages_complete": 0, "complete": false},
  "2.5l": {"pages_complete": 0, "complete": false},
  "2.5a": {"pages_complete": 0, "complete": false},
  "2.6l": {"pages_complete": 0, "complete": false},
  "2.6a": {"pages_complete": 0, "complete": false},
  "2.7l": {"pages_complete": 0, "complete": false},
  "2.8l": {"pages_complete": 0, "complete": false},
  "2.8a": {"pages_complete": 0, "complete": false},
  "2.9p": {"pages_complete": 0, "complete": false},
  "3.1l": {"pages_complete": 0, "complete": false},
  "3.2l": {"pages_complete": 0, "complete": false},
  "3.2a": {"pages_complete": 0, "complete": false},
  "3.3l": {"pages_complete": 0, "complete": false},
  "3.3a": {"pages_complete": 0, "complete": false},
  "3.4l": {"pages_complete": 0, "complete": false},
  "3.4a": {"pages_complete": 0, "complete": false},
  "3.5l": {"pages_complete": 0, "complete": false},
  "3.5a": {"pages_complete": 0, "complete": false},
  "3.6l": {"pages_complete": 0, "complete": false},
  "3.7l": {"pages_complete": 0, "complete": false},
  "3.7a": {"pages_complete": 0, "complete": false},
  "3.8l": {"pages_complete": 0, "complete": false},
  "3.8a": {"pages_complete": 0, "complete": false},
  "3.9l": {"pages_complete": 0, "complete": false},
  "3.9a": {"pages_complete": 0, "complete": false},
  "3.10p": {"pages_complete": 0, "complete": false},
  "3q": {"pages_complete": 0, "complete": false},
  "4.1l": {"pages_complete": 0, "complete": false},
  "4.2l": {"pages_complete": 0, "complete": false},
  "4.2a": {"pages_complete": 0, "complete": false},
  "4.3l": {"pages_complete": 0, "complete": false},
  "4.3a": {"pages_complete": 0, "complete": false},
  "4.4l": {"pages_complete": 0, "complete": false},
  "4.5l": {"pages_complete": 0, "complete": false},
  "4.6p": {"pages_complete": 0, "complete": false},
  "F.1p": {"pages_complete": 0, "complete": false},
  "F.2p": {"pages_complete": 0, "complete": false},
  "F.3p": {"pages_complete": 0, "complete": false}
}'
);""")

cur.execute("""CREATE TABLE IF NOT EXISTS js_intro_progress
(id integer PRIMARY KEY, 
FOREIGN KEY (id) REFERENCES users(id),
points integer DEFAULT 0,
badges integer DEFAULT 0,
current integer DEFAULT 0,
modules jsonb DEFAULT '
{
  "1.1l": {"pages_complete": 0, "complete": false},
  "1.2l": {"pages_complete": 0, "complete": false},
  "1.2a": {"pages_complete": 0, "complete": false},
  "1.3l": {"pages_complete": 0, "complete": false},
  "2.1l": {"pages_complete": 0, "complete": false},
  "2.2l": {"pages_complete": 0, "complete": false},
  "2.2a": {"pages_complete": 0, "complete": false},
  "2.3l": {"pages_complete": 0, "complete": false},
  "2.3a": {"pages_complete": 0, "complete": false},
  "2.4l": {"pages_complete": 0, "complete": false},
  "2.4a": {"pages_complete": 0, "complete": false},
  "2.5l": {"pages_complete": 0, "complete": false},
  "2.5a": {"pages_complete": 0, "complete": false},
  "2.6l": {"pages_complete": 0, "complete": false},
  "2.6p": {"pages_complete": 0, "complete": false},
  "2t": {"pages_complete": 0, "complete": false},
  "3.1l": {"pages_complete": 0, "complete": false},
  "3.2l": {"pages_complete": 0, "complete": false},
  "3.2a": {"pages_complete": 0, "complete": false},
  "3.3l": {"pages_complete": 0, "complete": false},
  "3.3a": {"pages_complete": 0, "complete": false},
  "3.4l": {"pages_complete": 0, "complete": false},
  "3.5p": {"pages_complete": 0, "complete": false},
  "3.5a": {"pages_complete": 0, "complete": false},
  "3q": {"pages_complete": 0, "complete": false},
  "4.1l": {"pages_complete": 0, "complete": false},
  "4.1a": {"pages_complete": 0, "complete": false},
  "4.2l": {"pages_complete": 0, "complete": false},
  "4.2a": {"pages_complete": 0, "complete": false},
  "4.3l": {"pages_complete": 0, "complete": false},
  "4.4p": {"pages_complete": 0, "complete": false},
  "4q": {"pages_complete": 0, "complete": false},
  "5.1l": {"pages_complete": 0, "complete": false},
  "5.2l": {"pages_complete": 0, "complete": false},
  "5.2a": {"pages_complete": 0, "complete": false},
  "5.3l": {"pages_complete": 0, "complete": false},
  "5.3a": {"pages_complete": 0, "complete": false},
  "5.4l": {"pages_complete": 0, "complete": false},
  "5.5l": {"pages_complete": 0, "complete": false},
  "5.5a": {"pages_complete": 0, "complete": false},
  "5.6l": {"pages_complete": 0, "complete": false},
  "5.6a": {"pages_complete": 0, "complete": false},
  "5.7p": {"pages_complete": 0, "complete": false},
  "5t": {"pages_complete": 0, "complete": false},
  "F.1p": {"pages_complete": 0, "complete": false},
  "F.2p": {"pages_complete": 0, "complete": false}
}'
);""")

cur.execute("""CREATE TABLE IF NOT EXISTS rankings
(id integer PRIMARY KEY, 
FOREIGN KEY (id) REFERENCES users(id),
name varchar(100),
total_points integer DEFAULT 0,
weekly_points integer DEFAULT 0,
weekly_placements jsonb DEFAULT '{}',
profile_pic varchar(100)
);""")

cur.execute("""
CREATE OR REPLACE FUNCTION user_insert_trigger_fnc()
  RETURNS trigger AS
$$
BEGIN
  INSERT INTO "python_kids_progress" ( "id" )
  VALUES(NEW."id");
  INSERT INTO "web_dev_basics_progress" ( "id" )
  VALUES(NEW."id");
  INSERT INTO "js_intro_progress" ( "id" )
  VALUES(NEW."id");
  INSERT INTO "rankings" ( "id", "name", "profile_pic" )
  VALUES(NEW."id", NEW."name", NEW."profile_pic");
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';
;""")

cur.execute("""
CREATE OR REPLACE TRIGGER user_insert_trigger
  AFTER INSERT
  ON "users"
  FOR EACH ROW
  EXECUTE PROCEDURE user_insert_trigger_fnc();
;""")

conn.commit()
cur.close()
conn.close()