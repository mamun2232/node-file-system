const fs = require("fs");


exports.getAllUser = (req, res, next) => {
  const query = req.query;
  fs.readFile("user.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "internal error" });
    } else {
      const myData = JSON.parse(data);
      let page, limit;
      if (query.page && query.limit) {
        page = query.page;
        limit = query.limit;
      } else {
        page = 1;
        limit = myData.length;
      }
      const allUser = myData.slice((page - 1) * limit, limit * page);
      if (allUser.length !== 0) {
        res.status(200).send(allUser);
      } else {
        res.status(200).json({ message: "No data found" });
      }
    }
  });
};

exports.getRandomUser = (req , res , next) =>{
  fs.readFile("user.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "internal error" });
    } else {
      const myData = JSON.parse(data);
      if (myData.length === 0) {
        res.status(200).json({ message: "no data found" });
      } else {
        const dataCount = myData.length;
        const randomUserIndex = Math.floor(Math.random() * dataCount);
        res.status(200).send(myData[randomUserIndex]);
      }
    }
  });
      
}

exports.userAdded = (req , res , next) =>{
  const newData = req.body;
  const error = req.error;
  if (error) {
    res.send("error");
  } else {
    fs.readFile("user.json", "utf-8", (err, data) => {
      if (err) {

        res.status(500).json({ error: "internal error" });
      } else {
        const myData = JSON.stringify([...JSON.parse(data), newData]);
        fs.writeFile("user.json", myData, (error) => {
          if (error) {
            res.status(500).json({ message: "internal error" });
          } else {
            res.status(201).json({ message: "user created" });
          }
        });
      }
    });
  }
}


exports.updateUser = (req , res , next) =>{
  const { id } = req.params;
  const newData = req.body;
  const { error, user } = req || {};
  if (error) {
    res.status(500).json({ error: "internal server error" });
  } else {
    const newUser = { ...user, ...newData };
    fs.readFile("user.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "internal error" });
      } else {
        const allUser = JSON.parse(data);
        const newUserArr = allUser.filter((user) => user.id != id);
        const updatedUser = JSON.stringify([...newUserArr, newUser]);
        fs.writeFile("user.json", updatedUser, (error) => {
          if (error) {
            res.status(500).json({ message: "internal error" });
          } else {
            res.status(201).json({ message: "user updated" });
          }
        });
      }
    });
  }
}

 
exports.deleteUser = (req, res , next) =>{
  const { id } = req.params;
  const error = req.error;
  if (!error) {
    fs.readFile("user.json", "utf-8", (err, data) => {
      if (err) {
        res.status(500).json({ error: "internal error" });
      } else {
        const myData = JSON.parse(data);
        const newData = myData.filter((user) => user.id != id);
        fs.writeFile(
          "user.json",
          JSON.stringify(newData),
          (error) => {
            if (error) {
              res.status(500).json({ message: "internal error" });
            } else {
              console.log(newData);
              res.status(200).json({ message: "user deleted" });
            }
          }
        );
      }
    });
  }

}

