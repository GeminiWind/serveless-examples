export default {
  "$id": "http://localhost/create-order+v1.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Create Order",
  "description": "An order",
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "format": "uuid"
        },
        "type": {
          "type": "string",
          "enum": [
            "orders"
          ]
        },
        "attributes": {
          "type": "object",
          "properties": {
            "items": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/item"
              },
              "minItems": 1
            },
            "customer": {
              "$ref": "#/definitions/customer"
            }
          },
          "required": [
            "items",
            "customer"
          ]
        }
      },
      "required": [
        "id",
        "type",
        "attributes"
      ]
    }
  },
  "definitions": {
    "item": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "Item Name"
        },
        "description": {
          "type": "string",
          "description": "Item Description"
        },
        "sku": {
          "type": "string",
          "description": "Item Sku"
        },
        "qty": {
          "type": "number",
          "description": "Item Qty"
        },
        "price": {
          "type": "number",
          "description": "Item Price"
        }
      },
      "required": ["name", "sku", "qty", "price"]
    },
    "customer": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "description": "Customer Firstname"
        },
        "lastName": {
          "type": "string",
          "description": "Customer Last Name"
        },
        "phoneNumber": {
          "type": "string",
          "description": "Customer Phone Number"
        },
        "address": {
          "type": "string",
          "description": "Customer Address"
        },
        "payment": {
          "type": "object",
          "properties": {
            "cardNumber": {
              "type": "string",
              "description": "Card Number"
            },
            "expiration": {
              "type": "string",
              "description": "Card expiration"
            },
            "code": {
              "type": "string",
              "description": "Card expiration",
              "maxLength": 3
            }
          },
          "required": ["cardNumber", "expiration", "code"]
        }
      },
      "required": ["firstName", "lastName", "address", "payment"]
    }
  }
}