FROM python:3.10.2-alpine
WORKDIR /usr/src/app

RUN apk update && apk add python3-dev gcc libc-dev
RUN python -m pip install --upgrade pip

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .
RUN python manage.py migrate

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]