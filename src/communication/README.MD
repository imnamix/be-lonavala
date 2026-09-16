

Communication Module Is responsible to create templates of diffrent types of modes.
Email , Text Msg , Notification etc.

# Sample Payload for Text Messages

                # sample payload 1 : Single Msg
                {
                    "id": 14,
                    "info": {
                      "data": {
                        "firstName": "Ram",
                        "lastName": "Patil"
                      },
                      "phoneNumber": "8867216600"
                    }
                }
                       
                # sample payload 2 : Multiple Msg
                {
                    "id": 14,
                    "info": [
                      {
                        "data": {
                          "firstName": "Ajay",
                          "lastName": "Devgan"
                        },
                        "phoneNumber": "11111"
                      },
                      {
                        "data": {
                          "firstName": "Kajon",
                          "lastName": "Devgan"
                        },
                        "phoneNumber": "2222"
                      }
                    ]
                  }

# Email Payload Sample

  # sample payload 1 : single Email
  {
    "id": 18,
    "info": {
      "data": {
        "firstName": "Veershaiv",
        "lastName": "Randhe"
      },
      "receiver": {
        "email": "vinayakb@anomaly.co.in"
      }
    }
  }

  # sample payload 2 : Multiple mails
    {
      "id": 18,
      "info": [{
        "data": {
          "firstName": "Rahul",
          "lastName": "Dravid"
        },
        "receiver": {
          "email": "vinayakb@anomaly.co.in"
        }
      },
    {
        "data": {
          "firstName": "Sachin",
          "lastName": "Tendulkar"
        },
        "receiver": {
          "email": "vinayakbardale@gmail.com"
        }
      }  
      ]
    }