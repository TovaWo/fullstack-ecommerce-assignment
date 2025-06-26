commands:
npm run build
npm run dev


curl command for post request 
'''
curl -X POST http://localhost:3001/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "name": "Tova Wolf",
      "email": "tova@example.com",
      "address": "Herzliya 1"
    },
    "items": [
       { "name": "Apple", "quantity": 2, "categoryId": 2 },
       { "name": "Banana", "quantity": 3,  "categoryId": 2 }
    ]
  }'

'''



