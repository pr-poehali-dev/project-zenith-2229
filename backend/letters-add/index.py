import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Добавление методического письма по ссылке"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    title = body.get('title', '').strip()
    subject = body.get('subject', '').strip()
    file_url = body.get('file_url', '').strip()

    if not title or not file_url:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не указано название или ссылка на файл'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO letters (title, filename, file_url, subject) VALUES (%s, %s, %s, %s) RETURNING id",
        (title, title, file_url, subject or None)
    )
    letter_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'id': letter_id})
    }
