import json
import os
import base64
import boto3
import psycopg2
import uuid

def handler(event: dict, context) -> dict:
    """Загрузка файла методического письма в S3 и сохранение в БД"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body', '{}'))
    title = body.get('title', '').strip()
    subject = body.get('subject', '').strip()
    filename = body.get('filename', '').strip()
    file_data = body.get('file_data', '')

    if not title or not filename or not file_data:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Не указано название, имя файла или данные файла'})
        }

    file_bytes = base64.b64decode(file_data)
    unique_key = f"letters/{uuid.uuid4()}_{filename}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    s3.put_object(Bucket='files', Key=unique_key, Body=file_bytes, ContentType='application/pdf')
    file_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{unique_key}"

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO letters (title, filename, file_url, subject) VALUES (%s, %s, %s, %s) RETURNING id",
        (title, filename, file_url, subject or None)
    )
    letter_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'id': letter_id, 'file_url': file_url})
    }
