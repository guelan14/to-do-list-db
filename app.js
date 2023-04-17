//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//conexion a db
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser: true});
//doc creation
const itemsSchema={
  name: String
}; 

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
  name: "WELCOMEEEE"
});

const defaultItems=[item1];




app.get("/", (req, res) =>{

  var today=new Date();

  var options={
    weekday:"long",
    day:"numeric",
    month:"long"};
    var day=today.toLocaleDateString("en-US", options);

  Item.find({}).then(foundItems=>{    
      res.render("list", {listTitle: day, newListItems: foundItems});
  });
});

app.post("/delete", (req,res)=>{
  const checkedItemId=req.body.checkbox;
  Item.findOneAndDelete({_id:checkedItemId}).exec();
  console.log(checkedItemId);
  res.redirect("/");
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  //doc creation
  const item=new Item({
    name:itemName
  });

  item.save();
  res.redirect("/");
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
