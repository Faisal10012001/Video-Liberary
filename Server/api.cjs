const express = require("express");
const cors = require("cors");
const mongoClient = require("mongodb").MongoClient;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// 🔥 Home Route
app.get("/", (req, res) => {
    res.send("Server is running successfully");
});


// 🔹 Get Categories
app.get("/get-categories", (req, res) => {

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tblcategories")
                .find({})
                .toArray()
                .then(documents => {

                    res.send(documents);
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


// 🔹 Get Users
app.get("/get-users", (req, res) => {

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tblusers")
                .find({})
                .toArray()
                .then(documents => {

                    res.send(documents);
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


// 🔹 Get Admin
app.get("/get-admin", (req, res) => {

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tbladmin")
                .find({})
                .toArray()
                .then(documents => {

                    res.send(documents);
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


// 🔹 Get All Videos
app.get("/get-videos", (req, res) => {

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tblvideos")
                .find({})
                .toArray()
                .then(documents => {

                    res.send(documents);
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


// 🔥 Get Single Video
app.get("/get-video/:id", (req, res) => {

    const id = parseInt(req.params.id);

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tblvideos")
                .find({ video_id: id })
                .toArray()
                .then(documents => {

                    res.send(documents);
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


// 🔹 Register User
app.post("/register-user", (req, res) => {

    const user = {
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        password: req.body.password,
        mobile: req.body.mobile,
        email: req.body.email
    };

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tblusers")
                .insertOne(user)
                .then(() => {

                    console.log("User Registered");
                    res.send({ success: true });
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


// 🔹 Add Video
app.post("/add-video", (req, res) => {

    const video = {
        video_id: parseInt(req.body.video_id),
        title: req.body.title,
        description: req.body.description,
        comments: req.body.comments,
        likes: parseInt(req.body.likes),
        views: parseInt(req.body.views),
        url: req.body.url,
        category_id: parseInt(req.body.category_id)
    };

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tblvideos")
                .insertOne(video)
                .then(() => {

                    console.log("Video Added");
                    res.send({ message: "Video Added" });
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


// 🔹 Edit Video
app.put("/edit-video/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const video = {
        $set: {
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
            category_id: parseInt(req.body.category_id)
        }
    };

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tblvideos")
                .updateOne({ video_id: id }, video)
                .then(() => {

                    console.log("Video Updated");
                    res.send({ message: "Video Updated" });
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


// 🔹 Delete Video
app.delete("/delete-video/:id", (req, res) => {

    const id = parseInt(req.params.id);

    mongoClient.connect("mongodb+srv://faisal:faisal123@cluster0.awvhhxv.mongodb.net/video-project?retryWrites=true&w=majority&appName=Cluster0")
        .then(clientObj => {

            const database = clientObj.db("video-project");

            database.collection("tblvideos")
                .deleteOne({ video_id: id })
                .then(() => {

                    console.log("Video Deleted");
                    res.send({ message: "Video Deleted" });
                    clientObj.close();

                })
                .catch(err => {
                    res.status(500).send({ error: err.message });
                });

        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });

});


const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server Started on ${PORT}`);
});