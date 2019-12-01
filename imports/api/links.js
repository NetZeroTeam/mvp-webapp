import { Mongo } from 'meteor/mongo';

export default Links = new Mongo.Collection('links');

Meteor.methods({

  'autoML.get' (data){
   let predict;
   try {

      //  predict =  HTTP.call("POST", "https://eu-automl.googleapis.com/v1beta1/projects/636168082047/locations/eu/models/TCN4898649757183901696:predict", {
      //   headers: {
      //     "Authorization": "Bearer ya29.c.Kl6xB_2SeIakv4mNvY9yi0lIkovytQBTDy4PXdDcY6PzbKHwU-IjiKpLFd4f_4Sw-8R_EomPtyV2TIcjc79xdE44_kb-BrBa0Gdo0e_tUrKpgNC-Dacb4fffkbafKapW",
      //     "Content-Type": "application/json"
      //   }, data: {
      //     "payload": {
      //       "textSnippet": {
      //         "content": data,
      //         "mime_type": "text/plain"
      //       }
      //     }
      //   }});

      //   return("AUTOML",JSON.stringify(predict).split("displayName")[1].split("}")[0].split('"')[2].replace(/\\/g, ''));


      let categ = ["food","clothes", "tech","transport"];
      let rand = Math.floor(Math.random()*categ.length);

      return  categ[rand];



   } catch (e) {
     console.log("ERROR",e);
   }

 },





   'geoLocation.get' (transactions, callback){
     this.unblock();

    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCI_u9C5mOSBvzigfTyCdHYEHBARidOkxo

    try {
      var len =transactions.data.Transactions.length;
      for (let i=0; i<len; i++){
        let name;
        let lat = transactions.data.Transactions[i].latitude;
        let long =  transactions.data.Transactions[i].longitude;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyCI_u9C5mOSBvzigfTyCdHYEHBARidOkxo`;

        name =  HTTP.call("GET", url);
        console.log("TRYYYY", name[0].formatted_address);
        transactions.data.Transactions[i].merchant = name;

      };


    } catch (e) {

    }
  console.log("YEE", transactions);
  callback(transactions);


  },

  'accounts.get'() {

    let accounts;

    try {

      accounts =  HTTP.call("GET", "https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts", {
          headers: {
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE1NzM4MjM4MjQsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTU3NDAzNTE5OSwiZGV2ZWxvcGVyX2lkIjoiMmI4MzMxODc5YTA3OTBiNWNiNjQ5ZDE0YWYwNjJhZTU3MWIzYjZjZGNiOGM4N2Y5OTdjZTIzMWU2M2JjNjBlYyJ9.iHEwRI-r1bV10sJZS4sLauZUMBDZRT3xQNAdALU2Q7CWQAUblME0a1zgqlO5U8NgUIrL0gUxBMwo6G3_0x1nebicRdOVQ18stanCsOIIvgAW0XHYqZn6kn0zOpvOU9g71HFxKysXWic6AfnKtoSd7jhRkqoZ3O5sAjpbswOElTTDvqfA0bA1YizntZGDHr-Ddft8dnuRaQj9NbV_cugDHp6pU7aYE9nS3ASOQq8B_sujx8DQ0hhI_gCtpM5Oi7KWmiSnjSIR68iEXEMi2sFEeDyGNVUvfqhIh7SuAXgMLe1FUL0LJvjwvOfYuNvq3Fn1WUTl4Y4YIKEO2PZPgSPdGQ",
            "Content-Type": "application/json",
            "version": "1.0"
          }
      });

    } catch (e) {

    }

  return accounts;
}, 'transactions.get'(id) {

  let transactions;

  transactions = HTTP.call("GET", `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${id}/transactions`, {
      headers: {
        "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE1NzM4MjM4MjQsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTU3NDAzNTE5OSwiZGV2ZWxvcGVyX2lkIjoiMmI4MzMxODc5YTA3OTBiNWNiNjQ5ZDE0YWYwNjJhZTU3MWIzYjZjZGNiOGM4N2Y5OTdjZTIzMWU2M2JjNjBlYyJ9.iHEwRI-r1bV10sJZS4sLauZUMBDZRT3xQNAdALU2Q7CWQAUblME0a1zgqlO5U8NgUIrL0gUxBMwo6G3_0x1nebicRdOVQ18stanCsOIIvgAW0XHYqZn6kn0zOpvOU9g71HFxKysXWic6AfnKtoSd7jhRkqoZ3O5sAjpbswOElTTDvqfA0bA1YizntZGDHr-Ddft8dnuRaQj9NbV_cugDHp6pU7aYE9nS3ASOQq8B_sujx8DQ0hhI_gCtpM5Oi7KWmiSnjSIR68iEXEMi2sFEeDyGNVUvfqhIh7SuAXgMLe1FUL0LJvjwvOfYuNvq3Fn1WUTl4Y4YIKEO2PZPgSPdGQ",
        "Content-Type": "application/json",
        "version": "1.0"
      }
  });

  return transactions;

}
});
