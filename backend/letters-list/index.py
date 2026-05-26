import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Получение списка методических писем из БД"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute("SELECT id, title, filename, file_url, subject, created_at FROM letters ORDER BY created_at DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    letters = [
        {
            'id': r[0],
            'title': r[1],
            'filename': r[2],
            'file_url': r[3],
            'subject': r[4],
            'created_at': r[5].isoformat() if r[5] else None
        }
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'letters': letters})
    }
