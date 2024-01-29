cd ai
uvicorn main:app --host 0.0.0.0 --port 8083 &
cd ..
docker compose down
docker compose up --build -d
