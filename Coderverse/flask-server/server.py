from flask import Flask, jsonify, request
import psycopg2
import numpy
import bcrypt
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline
model_name = "deepset/roberta-base-squad2"
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
import gpt4all
import json
app = Flask(__name__)

def db_conn():
    conn = psycopg2.connect(database="flask_db", host="localhost", user="postgres", password="", port="5432")
    return conn

data = {}

email = ""
name = ""
password = ""

@app.route('/get_users')
def get_users():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute('''SELECT * FROM users''')
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)

@app.route('/add_user', methods=['POST'])
def add_user():
    conn = db_conn()
    cur = conn.cursor()
    data = request.get_json()
    cur.execute("""INSERT INTO users (name, email, birth_date, password, salt) VALUES (%s, %s, %s, %s, %s)""", (data["name"], data["email"], data["birth_date"], data["password"], data["salt"]))
    conn.commit()
    cur.close()
    conn.close()
    return 'Done', 202

@app.route('/update_user', methods=['POST'])
def update_user():
    conn = db_conn()
    cur = conn.cursor()
    data = request.get_json()
    cur.execute("""UPDATE users SET name=%s WHERE id=%s""", data["name"])
    conn.commit()
    cur.close()
    conn.close()
    return 'Done', 202

@app.route('/update_python', methods=['POST'])
def update_python():
    conn = db_conn()
    cur = conn.cursor()
    data = request.get_json()
    cur.execute("""UPDATE python_kids_progress SET modules=%s WHERE id=%s""", (json.dumps(data["modules"]), data["id"],))
    conn.commit()
    cur.close()
    conn.close()
    return 'Done', 202
@app.route('/update_python_final', methods=['POST'])
def update_python_final():
    conn = db_conn()
    cur = conn.cursor()
    data = request.get_json()
    cur.execute("""UPDATE python_kids_progress SET modules=%s, points=%s, current=%s WHERE id=%s""", (json.dumps(data["modules"]), data["points"], data["current"], data["id"],))
    conn.commit()
    cur.close()
    conn.close()
    return 'Done', 202

@app.route('/update_rankings', methods=['POST'])
def update_rankings():
    conn = db_conn()
    cur = conn.cursor()
    data = request.get_json()
    cur.execute("""UPDATE rankings SET total_points=%s, weekly_points=%s WHERE id=%s""", (data["total"], data["weekly"], data["id"],))
    conn.commit()
    cur.close()
    conn.close()
    return 'Done', 202

@app.route('/update_profile', methods=['POST'])
def update_profile():
    conn = db_conn()
    cur = conn.cursor()
    data = request.get_json()
    cur.execute("""UPDATE users SET days_active=%s, streak=%s, max_streak=%s, points=%s WHERE id=%s""", (json.dumps(data["daysActive"]), data["streak"], data["maxStreak"], data["points"], data["id"]))
    conn.commit()
    cur.close()
    conn.close()
    return 'Done', 202

@app.route('/check_email_post', methods=['POST'])
def check_email_post():
    globals()["email"] = request.get_json()["email"]
    return 'Done', 202

@app.route('/check_email_get')
def check_email_get():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM users WHERE email = %s""", (email,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)

@app.route('/check_name_post', methods=['POST'])
def check_name_post():
    globals()["name"] = request.get_json()["name"]
    return 'Done', 202

@app.route('/check_name_get')
def check_name_get():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM users WHERE name = %s""", (name,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)

@app.route('/get_user_post', methods=['POST'])
def get_user_post():
    globals()["user_id"] = request.get_json()["user"]
    return 'Done', 202
@app.route('/get_user')
def get_user():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM users WHERE name = %s""", (name,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)
@app.route('/get_python')
def get_python():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM users WHERE name = %s""", (name,))
    id = cur.fetchall()[0][0]
    cur.execute("""SELECT * FROM python_kids_progress WHERE id = %s""", (id,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)
@app.route('/get_webdev')
def get_webdev():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM users WHERE name = %s""", (name,))
    id = cur.fetchall()[0][0]
    cur.execute("""SELECT * FROM web_dev_basics_progress WHERE id = %s""", (id,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)
@app.route('/get_js')
def get_js():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM users WHERE name = %s""", (name,))
    id = cur.fetchall()[0][0]
    cur.execute("""SELECT * FROM js_intro_progress WHERE id = %s""", (id,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)

@app.route('/get_weekly_ranks')
def get_weekly_ranks():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM rankings""")
    data = cur.fetchall()
    sorted_filtered_data = sorted(data, key=lambda x: x[3])
    reformatted_data = []
    for each in sorted_filtered_data:
        reformatted_data.insert(0, {"name": each[1], "level": 1, "points": each[3], "url": each[5], "total": each[2] })
    cur.close()
    conn.close()
    return jsonify(reformatted_data)

@app.route('/get_all_time_ranks')
def get_all_time_ranks():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM rankings""")
    data = cur.fetchall()
    sorted_filtered_data = sorted(data, key=lambda x: x[2])
    reformatted_data = []
    for each in sorted_filtered_data:
        reformatted_data.insert(0, {"name": each[1], "level": 1, "points": each[2], "url": each[5], "total": each[2] })
    cur.close()
    conn.close()
    return jsonify(reformatted_data)

@app.route('/account_exists_post', methods=['POST'])
def account_exists_post():
    globals()["name"] = request.get_json()["user"]
    globals()["password"] = request.get_json()["password"]
    return 'Done', 202
@app.route('/account_exists_get')
def account_exists_get():
    conn = db_conn()
    cur = conn.cursor()
    cur.execute("""SELECT * FROM users WHERE email = %s""", (name,))
    data = cur.fetchall()
    if len(data) != 0:
        hash = bcrypt.hashpw(globals()["password"].encode('utf-8'), data[0][5].encode('utf-8'))
        if hash == data[0][4].encode('utf-8'):
            cur.close()
            conn.close()
            return jsonify([True, data[0][1]])
    cur.execute("""SELECT * FROM users WHERE name = %s""", (name,))
    data = cur.fetchall()
    if len(data) != 0:
        hash = bcrypt.hashpw(globals()["password"].encode('utf-8'), data[0][5].encode('utf-8'))
        if hash == data[0][4].encode('utf-8'):
            cur.close()
            conn.close()
            return jsonify([True, data[0][1]])
    cur.close()
    conn.close()
    return jsonify([False, None])


@app.route('/add_chat', methods=['POST'])
def add_chat():
    globals()["data"] = request.get_json()
    return 'Done', 202

@app.route('/general_query')
def general_query():
    gpt = gpt4all.GPT4All("orca-mini-3b.ggmlv3.q4_0.bin")
    msgs = [{"role": "assistant", "content": globals()["data"]["question"]}]  
    content = gpt.chat_completion(msgs)
    return jsonify({'score': 1, 'answer': content['choices'][0]['message']['content'].replace("\n", "fidhuosd")})
@app.route('/app_query')
def app_query():
    QA_input = {
    'question': globals()["data"]["question"],
    'context': """Computer programs are sets of ordered steps used to achieve a specific goal! A computer program can do things like add two numbers. Computer programs must be dividable, ordered, determined, and repeatable. Four traits of computer programs are that they are dividable, ordered, determined, and repeatable.You can write a list in Python like [1, 2, 3] You can write a list in Python by writing [1, 2, 3]. You can write a dict like {"one": 1, "two": 2}. You can write a tuple like (1, 2, 3). You can make your first Python program by writing print("Hello, World!"). Programs execute lines of code. Dividable means able to be divided into multiple steps. Ordered means properly ordered. Determined means having a result that can be found. Repeatable means consistent results should be yielded. You can print a word or phrase like hello world by putting the phrase in quotes in print(). You can print numbers like 42 by putting the number in print(). You can print the number by putting the number in print(). print(Hello, World!) would cause an error due to the lack of quotes. You can print the word by putting the word in print() in quotes. You can print phrase by putting it in print() in quotes. You can print boolean by passing it into print. Your first program should be print("Hello, World!") You can print a word like by putting the word in print() in quotes. You can print a number like by putting the number in print()."""}
    res = nlp(QA_input)

    return jsonify({'score': res["score"], 'answer': res["answer"]})

if __name__ == "__main__":
    app.run(debug=True)