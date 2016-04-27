/**
 * Created by mengxichen on 4/10/16.
 */
module.exports = function(app,ReviewModel){
    app.post("/api/project/review", createReview);
    app.delete("/api/project/review/:reviewId",deleteReviewById);
    app.get("/api/project/review/username/:username", getAllReviewsByUsername);
    app.get("/api/project/review/vendor/:vendorUsername", getAllReviewsByVendorUsername);
    app.get("/api/project/review/admin/", getAllReviewsByAdmin);



    function createReview(req,res){
        var review = req.body;
        ReviewModel.createReview(review)
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            );

    }

    function deleteReviewById(req,res){
        var reviewId = req.params.reviewId;
        ReviewModel.deleteReviewById(reviewId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                })
    }

    function getAllReviewsByUsername(req,res){
        var username = req.params.username;
        ReviewModel.getAllReviewsByUsername(username)
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            )
    }

    function getAllReviewsByVendorUsername(req, res){
        var vendorUsername = req.params.vendorUsername;
        ReviewModel.getAllReviewsByVendorUsername(vendorUsername)
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            )
    }

    function getAllReviewsByAdmin(req,res){
        ReviewModel.getAllReviewsByAdmin()
            .then(
                function(doc){
                    res.json(doc);
                },
                function (err){
                    res.status(400).send(err);
                }
            )
    }

};