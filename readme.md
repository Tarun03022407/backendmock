base_url : https://shy-puce-ox-coat.cyclic.app
To register a user :
use api endpoint --> base_url/register
method:"POST",
Body:{
name: String,
email: String,
password: String
}

To login a user :
use api endpoint --> base_url/login,
method:"POST",
Body:{
email: String,
password: String
}

To get details of flights :
use api endpoint --> base_url/flights
method:"GET"

To get details of particular flight :
use api endpoint --> base_url/flights/flightID
method:"GET"


To update details of particular flight :
use api endpoint --> base_url/flights/flightID
method:"PATCH"
Body:{
changed keyValue pairs
}

To delete details of particular flight :
use api endpoint --> base_url/flights/flightID
method:"DELETE"

To Book a specific flight:
token:"user token"
use api endpoint --> base_url/booking/flightID
method:"POST"


To get data of bookings in dashboard:

use api endpoint --> base_url/dashboard
method:"GET"
token:"user token"



